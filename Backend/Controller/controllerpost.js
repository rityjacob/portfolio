import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const getPosts = (req,res) => {
    
    const limit = parseInt(req.query.limit);

    if(!isNaN(limit) && limit > 0){
        res.status(200).json(posts.slice(0,limit));
    }
    else{
        res.status(200).json(posts);
        
    }
    
};



export const getServer = (req,res)=>{
    res.json('hello');
}

export const pingServer = (req,res)=>{
    res.json({ success: true, message: 'Server is awake!' });
}



export const postContact = async(req,res) =>{
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
        await sendEmail(process.env.SMTP_USER, emailSubject, body);


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



};

async function sendEmail(to_email, subject, body) {
  try {
    const data = await resend.emails.send({
      from: 'Rity <contact@rityjacob.com>',
      to: to_email,
      subject: subject,
      text: body,
    });

    console.log('Admin email sent:', data);
    return data;
  } catch (error) {
    console.error('Admin email error:', error);
    throw error;
  }
}

async function sendEmailToUser(email, bodyUser) {
  try {
    const data = await resend.emails.send({
      // ✅ same verified domain
      from: 'Rity <contact@rityjacob.com>',
      to: email,
      subject: 'Thank you for reaching out',
      text: bodyUser,
    });

    console.log('User email sent:', data);
    return data;
  } catch (error) {
    console.error('User email error:', error);
    throw error;
  }
}

