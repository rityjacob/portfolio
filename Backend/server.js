const express = require('express');
const path = require('path');
const { title } = require('process');
const cors = require('cors');
const nodemailer = require('nodemailer');


const PORT = process.env.PORT || 5001
const app = express();

async function sendEmail(to_email,subject,body) {

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth : {
            user : process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
    })
    
}

app.get('/api/contact',(req,res) =>{
    
    res.json({ success: true, msg:'Message Sent'})

});

app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));

console.log('Hello');
