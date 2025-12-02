const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const logger = require('./Logger/logger.js')


const PORT = process.env.PORT || 5001
const app = express();

app.use(express.json());
app.use(cors());

//logger
app.use(logger);



async function sendEmail(to_email,email,subject,body) {

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth : {
            user : process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
    });

    return transporter.sendMail({
        from: process.env.SMTP_USER,
        to: to_email,
        email,
        subject: subject,
        text: body,
    });
    
}


async function sendEmailToUser(email, bodyUser) {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth : {
            user : process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
    });

    return transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        email,
        subject: 'Thank you for reaching out',
        text: bodyUser,
    });
}



app.get('/api/contact', (req,res)=>{
    res.json('hello');
})


app.post('/api/contact',async(req,res) =>{
    const {name, email, subject, message} = req.body;

    if(!name||!email||!message){
     return res.status(400).json({succes: false, msg:'All fields are required'})}

    try {
        // Building email
        const emailSubject = `New message from ${name}: ${subject}`;
        const body = `From : ${name}
        Message: ${message}
        Email: ${email}`;

        //Send email, calling fn above
        await sendEmail(process.env.SMTP_USER, email, emailSubject, body);



        // Email to the User
        bodyUser =` Hello ${name}, thank you for reaching out. I will get back to you asap`

        await sendEmailToUser(email,bodyUser);


        //Respond to frontend
        res.json({sucess: true, msg:'Message sent,test'});
    }catch(err){
        console.log(`Error occured `,err);
        res.status(500).json({ success: false, msg: 'Email Failed' });
    }



});

app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));

// console.log('Hello');

// response mail, add later 

 // if(!name||!subject||!message){
    //     return res.status(400).json({msg:'All fields are required'})
    // }

    // const adminHtml = `‹div style="font-family: Arial,sans-serif; padding: 20px; color: #333;">
    //                     <h2>New Contact Form Submission</h2>
    //                     ‹p><strong>Name:</strong>
    //                     ${name} </ p>
    //                     <p><strong>subject</ strong>
    //                     ${subject} </ p>
    //                     <p><strong>Message:</strong></p>
    //                     <p>${message}</p>‹/ div>`;

    // const userHtml = `‹div style="font-family: Arial, sans-serif; padding: 20px; color: #333;"> 
    // <h2>New Contact Form Submission</h2> <p>Dear ${name}</p>
    // <p>Thank you for contacting us</p>
    // ‹/ div>`;

    // const adminMailOptions = {
    //     from: process.env.SMTP_USER,
    //     to: process.env.SMTP_USER,
    //     subject: `${subject}`,
    //     html: adminHtml,
    // };

    // const userMailOption = {
    //     from: process.env.SMTP_USER,
    //     to: process.env.SMTP_USER,
    //     subject: `Thank you for contacting`,
    //     html: userHtml,
    // };
