const nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port:process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


const sendMail=(to, subject, body)=>{
  transport.sendMail({
		from: process.env.EMAIL_USER,
		to,
		subject,
    text: body
		});

}

module.exports= {sendMail, transport}