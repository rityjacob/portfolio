const express = require('express');
const path = require('path');
const { title } = require('process');
const cors = require('cors');
const nodemailer = require('nodemailer');


const PORT = process.env.PORT || 5001
const app = express();



let contact = [{name: 'RJ', email:'rj@gmail.com', message:'Hello Rityy'},];

const sendEmail = (to_email, subject,body) => {
    console.log('Hello Rity');
    
}

app.get('/api/contact',(req,res) =>{
    
    sendEmail();
    res.json({ success: true, msg:'Message Sent'})

});

app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));

console.log('Hello');
