// File: api/send-email.js
// This is a Vercel serverless function

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  // Validate email
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Your SendGrid API key (we'll set this as environment variable)
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

  const emailData = {
    personalizations: [
      {
        to: [{ email: email }],
        subject: "JACOB FAMILONI FOR PRESIDENT - America's New Beginning"
      }
    ],
    from: {
      email: "ayodeleo@twinsglobalconsulting.com",
      name: "Jacob Familoni Campaign"
    },
    content: [
      {
        type: "text/plain",
        value: `JACOB FAMILONI
FOR PRESIDENT OF THE UNITED STATES
AMERICA'S NEW BEGINNING!

This is one of the most important messages of my campaign.

I am pleased to announce that today, I am issuing an OFFICIAL PRESIDENTIAL ENDORSEMENT recognizing you as a founding member of the 2028 Familoni Presidential Advisory Board.

You have shown tremendous support for our vision to restore America's greatness, and I want to personally thank you for standing with us from the beginning.

CONGRATULATIONS! You have my COMPLETE AND TOTAL ENDORSEMENT for this incredible honor!

Together, we will:
• Restore economic prosperity for all Americans
• Secure our borders and strengthen national security
• Uphold the Constitution and protect our freedoms
• Make America respected around the world once again

With gratitude and determination,
Jacob Familoni`
      },
      {
        type: "text/html",
        value: `<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
  <div style="text-align: center; font-weight: bold; font-size: 20px; margin-bottom: 30px; color: #1a5490;">
    JACOB FAMILONI<br>
    FOR PRESIDENT OF THE UNITED STATES<br>
    AMERICA'S NEW BEGINNING!
  </div>
  
  <p style="margin-bottom: 15px;">This is one of the most important messages of my campaign.</p>
  
  <div style="background-color: #f0f8ff; padding: 15px; border-left: 4px solid #1a5490; margin: 20px 0;">
    <p>I am pleased to announce that today, I am issuing an <strong>OFFICIAL PRESIDENTIAL ENDORSEMENT</strong> recognizing you as a founding member of the <strong>2028 Familoni Presidential Advisory Board</strong>.</p>
  </div>
  
  <p style="margin-bottom: 15px;">You have shown tremendous support for our vision to restore America's greatness, and I want to personally thank you for standing with us from the beginning.</p>
  
  <p style="margin-bottom: 15px;"><strong>CONGRATULATIONS! You have my COMPLETE AND TOTAL ENDORSEMENT for this incredible honor!</strong></p>
  
  <p style="margin-bottom: 10px;"><strong>Together, we will:</strong></p>
  <ul style="list-style: none; padding-left: 0; margin: 20px 0;">
    <li style="padding: 8px 0; padding-left: 25px; position: relative;">
      <span style="position: absolute; left: 0; color: #1a5490; font-weight: bold;">✓</span>
      Restore economic prosperity for all Americans
    </li>
    <li style="padding: 8px 0; padding-left: 25px; position: relative;">
      <span style="position: absolute; left: 0; color: #1a5490; font-weight: bold;">✓</span>
      Secure our borders and strengthen national security
    </li>
    <li style="padding: 8px 0; padding-left: 25px; position: relative;">
      <span style="position: absolute; left: 0; color: #1a5490; font-weight: bold;">✓</span>
      Uphold the Constitution and protect our freedoms
    </li>
    <li style="padding: 8px 0; padding-left: 25px; position: relative;">
      <span style="position: absolute; left: 0; color: #1a5490; font-weight: bold;">✓</span>
      Make America respected around the world once again
    </li>
  </ul>
  
  <div style="margin-top: 30px; font-style: italic;">
    <p>With gratitude and determination,<br>Jacob Familoni</p>
  </div>
</body>
</html>`
      }
    ]
  };

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    if (response.ok) {
      return res.status(200).json({ 
        success: true, 
        message: 'Email sent successfully!' 
      });
    } else {
      const errorData = await response.text();
      console.error('SendGrid error:', errorData);
      return res.status(500).json({ 
        error: 'Failed to send email',
        details: errorData
      });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Server error',
      details: error.message
    });
  }
}