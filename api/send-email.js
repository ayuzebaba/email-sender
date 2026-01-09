// File: api/send-email.js
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const msg = {
    to: email,
    from: {
      email: "ayodeleo@twinsglobalconsulting.com",
      name: "Jacob Familoni Campaign"
    },
    subject: "JACOB FAMILONI FOR PRESIDENT - America's New Beginning",
    text: `JACOB FAMILONI
FOR PRESIDENT OF THE UNITED STATES
AMERICA'S NEW BEGINNING!

This is one of the most important messages of my campaign...

With gratitude and determination,
Jacob Familoni`,
    html: `<html><body>
      <h2>JACOB FAMILONI FOR PRESIDENT - AMERICA'S NEW BEGINNING!</h2>
      <p>This is one of the most important messages of my campaign...</p>
      <p>With gratitude and determination,<br>Jacob Familoni</p>
    </body></html>`
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("SendGrid error:", error);
    return res.status(500).json({
      error: "Failed to send email",
      details: error.response?.body || error.message
    });
  }
}
