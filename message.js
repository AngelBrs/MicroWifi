// Vercel serverless function
// GET  /api/message → returns current message as plain text
// POST /api/message → sets a new message

global._message = global._message || "Hello micro:bit!";

module.exports = function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "GET") {
    res.setHeader("Content-Type", "text/plain");
    return res.status(200).send(global._message);
  }

  if (req.method === "POST") {
    let body = "";
    req.on("data", chunk => { body += chunk.toString(); });
    req.on("end", () => {
      const text = body.trim().slice(0, 200);
      if (text) global._message = text;
      return res.status(200).send("ok");
    });
    return;
  }

  return res.status(405).send("Method not allowed");
};
