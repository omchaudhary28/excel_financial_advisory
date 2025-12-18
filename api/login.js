export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch(
      "https://excel-financial-advisory.kesug.com/login.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(req.body),
      }
    );

    const data = await response.text();

    res.setHeader("Content-Type", "application/json");
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Proxy error",
      error: error.message,
    });
  }
}
