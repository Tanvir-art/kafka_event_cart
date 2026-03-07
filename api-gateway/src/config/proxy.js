import axios from "axios";

export const proxyRequest = async (req, res, target) => {
  if (!target) {
    return res.status(500).json({ message: "Proxy target is not configured" });
  }

  const headers = { ...req.headers };
  delete headers.host;
  delete headers.connection;
  delete headers["content-length"];

  try {
    const response = await axios({
      method: req.method,
      url: `${target}${req.originalUrl}`,
      data: req.body,
      headers,
      timeout: 15000,
      validateStatus: () => true
    });

    res.status(response.status).send(response.data);
  } catch (error) {
    console.error("Proxy error:", error.message, "target:", target, "path:", req.originalUrl);
    res.status(502).json({ message: "Service unavailable" });
  }
};
