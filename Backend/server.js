const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const logger = require('./Logger/logger.js')
const {Resend} = require('resend');


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



// async function sendEmail(to_email,email,subject,body) {

//     const transporter = nodemailer.createTransport({
//         service : "gmail",
//         auth : {
//             user : process.env.SMTP_USER,
//             pass: process.env.SMTP_PASS
//         },
//         connectionTimeout: 10000,
//     });

//     console.log('sending mail of admin');
//     return transporter.sendMail({
//         from: process.env.SMTP_USER,
//         to: to_email,
//         email,
//         subject: subject,
//         text: body,
//     });
    
    
    
// }


// async function sendEmailToUser(email, bodyUser) {
//     console.log('going to create transport');
    
//     const transporter = nodemailer.createTransport({
//         host: process.env.SMTP_HOST,
//         port: process.env.SMTP_PORT,
//         secure: false,
//         auth : {
//             user : process.env.SMTP_USER,
//             pass: process.env.SMTP_PASS
//         },
//     });

//     console.log('sending mail of admin');

//     return transporter.sendMail({
//         from: process.env.SMTP_USER,
//         to: email,
//         email,
//         subject: 'Thank you for reaching out',
//         text: bodyUser,
//     });
//     console.log('sent mail');
    
// }


async function sendEmail(to_email, subject, body) {
  try {
    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: to_email,
      subject: subject,
      text: body
    });

    console.log("Admin email sent:", data);
    return data;
  } catch (error) {
    console.error("Admin email error:", error);
    throw error;
  }
}

async function sendEmailToUser(email, bodyUser) {
  try {
    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: email,
      subject: "Thank you for reaching out",
      text: bodyUser
    });

    console.log("User email sent:", data);
    return data;
  } catch (error) {
    console.error("User email error:", error);
    throw error;
  }
}






app.get('/api/contact', (req,res)=>{
    res.json('hello');
})


app.post('/api/contact',async(req,res) =>{
    console.log('Incoming contact request:', req.body);
    
    const {name, email, subject, message} = req.body;

    if(!name||!email||!message){
     return res.status(400).json({succes: false, msg:'All fields are required'})}

    try {
        // Building email
        const emailSubject = `New message from ${name}: ${subject}`;
        const body = `From : ${name}
        Message: ${message}
        Email: ${email}`;

        console.log('Sending admin email...');
        //Send email, calling fn above
        await sendEmail(process.env.SMTP_USER, email, emailSubject, body);


        console.log('Sending user email...');
        // Email to the User
        bodyUser =` Hello ${name}, Thank you for your message. I will get back to you soon`

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
