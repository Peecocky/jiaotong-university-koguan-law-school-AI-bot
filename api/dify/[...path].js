// Vercel Edge Function: proxies streaming requests to Dify.
// Deployed at /api/dify/[...path].js → handles /api/dify/chat-messages etc.
// Edge Functions support streaming natively and can call HTTP endpoints.

export const config = { runtime: "edge" };

const DIFY_ORIGIN = "http://218.78.134.191/v1";

export default async function handler(req) {
  // Build the downstream Dify URL from the incoming path
  const url = new URL(req.url);
  // pathname = /api/dify/chat-messages  →  /chat-messages
  const difyPath = url.pathname.replace(/^\/api\/dify/, "") || "/";
  const difyUrl = `${DIFY_ORIGIN}${difyPath}${url.search}`;

  // Forward the request to Dify
  const headers = new Headers(req.headers);
  // Remove host header so Dify gets its own
  headers.delete("host");

  try {
    const res = await fetch(difyUrl, {
      method: req.method,
      headers,
      body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
      // Don't follow redirects automatically
      redirect: "follow",
    });

    // Stream the response back
    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: {
        "Content-Type": res.headers.get("Content-Type") || "text/event-stream",
        "Cache-Control": "no-cache",
        "Transfer-Encoding": res.headers.get("Transfer-Encoding") || "",
        // Allow CORS from same origin
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
}
