const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import the 'cors' package

const app = express();
const port = 5000;

app.use(bodyParser.json());

// Use the 'cors' middleware to enable CORS for the '/api/submit' route
app.use('/api/submit', cors({
  origin: 'https://64f30e17cba86e678c9dc47b--celebrated-kelpie-300433.netlify.app',
  methods: 'POST', // Allow only POST requests
}));

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
