const http = require("http");
const https = require("https");

const DEFAULT_DIFY_BASE_URL = "https://api.dify.ai/v1";

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
}

function sendJson(res, statusCode, payload) {
  setCorsHeaders(res);
  res.status(statusCode).json(payload);
}

function getDifyBaseUrl() {
  const configuredBaseUrl = (process.env.DIFY_API_BASE_URL || DEFAULT_DIFY_BASE_URL).trim();
  const trimmedBaseUrl = configuredBaseUrl.replace(/\/+$/, "");
  const normalizedBaseUrl = trimmedBaseUrl.replace(
    /\/v1\/(chat-messages(?:\/[^/]+\/stop)?|files\/upload|messages(?:\/[^/]+(?:\/feedbacks|\/suggested)?)?|conversations(?:\/[^/]+(?:\/name|\/variables)?)?|audio-to-text|text-to-audio|info|parameters|meta|site|app\/feedbacks|apps\/annotations(?:\/[^/]+)?|apps\/annotation-reply(?:\/[^/]+(?:\/status\/[^/]+)?)?)$/i,
    "/v1"
  );

  return /\/v1$/i.test(normalizedBaseUrl) ? normalizedBaseUrl : `${normalizedBaseUrl}/v1`;
}

function getDifyPath(req) {
  const pathParam = req.query && req.query.path;

  if (Array.isArray(pathParam) && pathParam.length > 0) {
    return `/${pathParam.join("/")}`;
  }

  if (typeof pathParam === "string" && pathParam.length > 0) {
    return `/${pathParam}`;
  }

  const pathname = new URL(req.url, "http://localhost").pathname;
  const strippedPath = pathname.replace(/^\/api\/dify/, "");

  if (strippedPath && strippedPath !== pathname) {
    return strippedPath || "/";
  }

  return "/";
}

function isHealthCheckRequest(req, difyPath) {
  return req.method === "GET" && difyPath === "/health";
}

async function readRequestBody(req) {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks);
}

function buildRequestBody(req, bodyBuffer) {
  const defaultUser = process.env.DIFY_API_USER;
  const contentType = req.headers["content-type"] || "";

  if (!defaultUser || bodyBuffer.length === 0 || !contentType.includes("application/json")) {
    return bodyBuffer;
  }

  try {
    const payload = JSON.parse(bodyBuffer.toString("utf8"));

    if (!payload.user) {
      payload.user = defaultUser;
      return Buffer.from(JSON.stringify(payload));
    }
  } catch (error) {
    console.warn("Unable to enrich Dify payload with default user:", error.message);
  }

  return bodyBuffer;
}

function requestJson({ targetUrl, method = "GET", headers = {}, timeout = 10000 }) {
  const transport = targetUrl.protocol === "https:" ? https : http;

  return new Promise((resolve, reject) => {
    const upstreamReq = transport.request(
      {
        hostname: targetUrl.hostname,
        port: targetUrl.port || (targetUrl.protocol === "https:" ? 443 : 80),
        path: targetUrl.pathname + targetUrl.search,
        method,
        headers,
        timeout,
      },
      (upstreamRes) => {
        const chunks = [];

        upstreamRes.on("data", (chunk) => {
          chunks.push(chunk);
        });

        upstreamRes.on("end", () => {
          const rawBody = Buffer.concat(chunks).toString("utf8");
          let parsedBody = null;

          try {
            parsedBody = rawBody ? JSON.parse(rawBody) : null;
          } catch (error) {
            parsedBody = rawBody || null;
          }

          resolve({
            ok: (upstreamRes.statusCode || 500) < 400,
            status: upstreamRes.statusCode || 500,
            body: parsedBody,
          });
        });

        upstreamRes.on("error", reject);
      }
    );

    upstreamReq.on("error", reject);
    upstreamReq.on("timeout", () => {
      upstreamReq.destroy(new Error("Upstream timeout"));
    });
    upstreamReq.end();
  });
}

async function handleHealthCheck(req, res, authorization) {
  const baseUrl = getDifyBaseUrl();
  const infoUrl = new URL(`${baseUrl}/info`);

  try {
    const result = await requestJson({
      targetUrl: infoUrl,
      headers: {
        Accept: "application/json",
        Authorization: authorization,
      },
      timeout: 10000,
    });

    return sendJson(res, result.ok ? 200 : result.status, {
      ok: result.ok,
      target: infoUrl.toString(),
      hasApiKey: Boolean(process.env.DIFY_API_KEY),
      upstreamStatus: result.status,
      upstreamBody: result.body,
    });
  } catch (error) {
    return sendJson(res, 502, {
      ok: false,
      target: infoUrl.toString(),
      hasApiKey: Boolean(process.env.DIFY_API_KEY),
      error: error.message,
      hint: "Vercel cannot reach the Dify upstream. Check whether the Dify service is publicly reachable from the Internet.",
    });
  }
}

function buildProxyErrorPayload(error, targetUrl) {
  const networkCodes = new Set(["ETIMEDOUT", "ECONNREFUSED", "EHOSTUNREACH", "ENETUNREACH"]);
  const isNetworkError = networkCodes.has(error.code);

  return {
    error: `Proxy error: ${error.message}`,
    code: error.code || null,
    target: targetUrl.toString(),
    hint: isNetworkError
      ? "The upstream Dify endpoint is not reachable from the serverless runtime. Expose Dify on a public reachable address or deploy the proxy in the same network."
      : undefined,
  };
}

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    setCorsHeaders(res);
    return res.status(200).end();
  }

  const apiKey = process.env.DIFY_API_KEY || "";
  const fallbackAuthorization = req.headers.authorization || "";
  const authorization = apiKey ? `Bearer ${apiKey}` : fallbackAuthorization;

  if (!authorization) {
    return sendJson(res, 500, {
      error: "Missing DIFY_API_KEY. Configure it in Vercel project settings.",
    });
  }

  const difyPath = getDifyPath(req);
  if (isHealthCheckRequest(req, difyPath)) {
    return handleHealthCheck(req, res, authorization);
  }

  const search = new URL(req.url, "http://localhost").search;
  const targetUrl = new URL(`${getDifyBaseUrl()}${difyPath}${search}`);
  const requestBody = buildRequestBody(req, await readRequestBody(req));
  const transport = targetUrl.protocol === "https:" ? https : http;

  return new Promise((resolve) => {
    const headers = {
      Accept: req.headers.accept || "*/*",
      Authorization: authorization,
    };

    if (req.headers["content-type"]) {
      headers["Content-Type"] = req.headers["content-type"];
    }

    if (requestBody.length > 0) {
      headers["Content-Length"] = requestBody.length;
    }

    const proxyReq = transport.request(
      {
        hostname: targetUrl.hostname,
        port: targetUrl.port || (targetUrl.protocol === "https:" ? 443 : 80),
        path: targetUrl.pathname + targetUrl.search,
        method: req.method,
        headers,
        timeout: 60000,
      },
      (proxyRes) => {
        setCorsHeaders(res);
        res.setHeader("Cache-Control", "no-cache, no-transform");
        res.setHeader("Connection", "keep-alive");
        res.setHeader("X-Accel-Buffering", "no");
        res.setHeader("Content-Type", proxyRes.headers["content-type"] || "text/event-stream");
        res.status(proxyRes.statusCode || 502);

        proxyRes.on("data", (chunk) => {
          res.write(chunk);
        });

        proxyRes.on("end", () => {
          res.end();
          resolve();
        });

        proxyRes.on("error", (error) => {
          console.error("Proxy response error:", error);
          if (!res.writableEnded) {
            res.end();
          }
          resolve();
        });
      }
    );

    proxyReq.on("error", (error) => {
      console.error("Proxy request error:", error);
      sendJson(res, 502, buildProxyErrorPayload(error, targetUrl));
      resolve();
    });

    proxyReq.on("timeout", () => {
      proxyReq.destroy();
      sendJson(res, 504, { error: "Gateway timeout" });
      resolve();
    });

    if (requestBody.length > 0) {
      proxyReq.write(requestBody);
    }

    proxyReq.end();
  });
};
