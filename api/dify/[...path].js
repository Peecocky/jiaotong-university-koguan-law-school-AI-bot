const http = require("http");
const https = require("https");

const DEFAULT_DIFY_BASE_URL = "http://218.78.134.191/v1";

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

  return /\/v1$/i.test(trimmedBaseUrl) ? trimmedBaseUrl : `${trimmedBaseUrl}/v1`;
}

function getDifyPath(req) {
  const pathParam = req.query.path;

  if (Array.isArray(pathParam) && pathParam.length > 0) {
    return `/${pathParam.join("/")}`;
  }

  if (typeof pathParam === "string" && pathParam.length > 0) {
    return `/${pathParam}`;
  }

  return "/";
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
      sendJson(res, 502, { error: `Proxy error: ${error.message}` });
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
