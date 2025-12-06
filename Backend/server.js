const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const logger = require('./Logger/logger.js')
const {Resend} = require('resend');
const route = require('./Routes/routes.js')


const resend = new Resend(process.env.RESEND_API_KEY);
const PORT = process.env.PORT || 5001
const app = express();

// temp log, cleanup later

console.log('SMTP config on startup:', {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
  hasPass: !!process.env.SMTP_PASS,
});

const corsOptions = {
  origin: [
    'https://rityjacob.com',      // your Netlify/custom domain
    'http://localhost:8000',      // dev backend (optional)      // dev frontend (optional)
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.options('/api/contact', cors(corsOptions)); // handle preflight explicitly


app.use(express.json());


//logger
app.use(logger);

//Route
app.use(route)


app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));
