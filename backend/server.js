const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.post('/api/submit', (req, res) => {
  const userDetails = req.body; 
  sendEmail(userDetails.__email, userDetails);
  res.status(200).json({ message: 'Form submitted successfully' });
});
function sendEmail(__email, userDetails) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'lakshaykhattar0208@gmail.com',
      pass: 'ekyfhrtqbrcvdpgt',
    },
  });
  const mailOptions = {
    from: 'lakshaykhattar0208@gmail.com',
    to: __email,
    subject: 'Thank you for your submission',
    html: `<p>Here is the information you submitted:</p>
      <pre>${JSON.stringify(userDetails, null, 2)}</pre>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email sending failed', error);
    } else {
      console.log('Email sent successfully', info.response);
    }
  });
}
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
