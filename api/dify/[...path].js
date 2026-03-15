// Vercel Node.js Serverless Function: proxies streaming requests to Dify.
// Node.js runtime CAN connect to plain HTTP endpoints (unlike Edge Functions).
const http = require("http");

module.exports = async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    return res.status(200).end();
  }

  // Extract the downstream path: /api/dify/chat-messages → /v1/chat-messages
  const difyPath = req.url.replace(/^\/api\/dify/, "") || "/";
  const targetUrl = `http://218.78.134.191/v1${difyPath}`;

  // Collect the request body
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const bodyBuffer = Buffer.concat(chunks);

  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(targetUrl);

    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || 80,
      path: parsedUrl.pathname + parsedUrl.search,
      method: req.method,
      headers: {
        "Content-Type": req.headers["content-type"] || "application/json",
        "Authorization": req.headers["authorization"] || "",
        "Content-Length": bodyBuffer.length,
      },
      timeout: 60000,
    };

    const proxyReq = http.request(options, (proxyRes) => {
      // Set response headers for SSE streaming
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cache-Control", "no-cache, no-transform");
      res.setHeader("Connection", "keep-alive");
      res.setHeader("Content-Type", proxyRes.headers["content-type"] || "text/event-stream");
      res.setHeader("X-Accel-Buffering", "no");
      res.status(proxyRes.statusCode);

      // Pipe the Dify response stream directly to the client
      proxyRes.on("data", (chunk) => {
        res.write(chunk);
      });

      proxyRes.on("end", () => {
        res.end();
        resolve();
      });

      proxyRes.on("error", (err) => {
        console.error("Proxy response error:", err);
        res.end();
        resolve();
      });
    });

    proxyReq.on("error", (err) => {
      console.error("Proxy request error:", err);
      res.status(502).json({ error: `Proxy error: ${err.message}` });
      resolve();
    });

    proxyReq.on("timeout", () => {
      proxyReq.destroy();
      res.status(504).json({ error: "Gateway timeout" });
      resolve();
    });

    // Send the request body
    if (bodyBuffer.length > 0) {
      proxyReq.write(bodyBuffer);
    }
    proxyReq.end();
  });
};
