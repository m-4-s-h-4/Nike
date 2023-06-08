const express = require('express');
const app = express();
const cors = require('cors');
const productsJSON = require('./assets/products.json');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors())

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

app.use(express.json());

app.get('/', (_, res) => {
  res.send('Email API service is up and running');
});

app.get('/products', (_, res) => {
  res.json(productsJSON);
});

app.post('/orders', (req, res) => {
  const { subject, email } = req.body;
  transport.sendMail({
    subject,
    html: email,
    from: 'sender@address',
    to: 'recipient@address',
  }).then((info) => {
    console.log('Email sent', info);
    return res.send('Email sent successfully');
  }).catch((error) => {
    console.error(error);
    return res.send(error);
  });
});


const port = 3000;
app.listen(port, () => {
  console.log(`Orders server is running on port ${port}`);
});
