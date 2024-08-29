const nodemailer = require("nodemailer");




//     var transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'edurainbow.info@gmail.com',
//         pass: 'bbvlxfenzfnrfxrv'
//       }
//     });
    
//     var mailOptions = {
//       from: 'edurainbow.info@gmail.com',
//       to: 'nibhasitsolutions@gmail.com',
//       subject: 'Sending Email using Node.js',
//       text: 'That was easy!'
//     };
    
//    await transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
//     });
module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.HOST,
			service: process.env.SERVICE,
			//port: process.env.EMAIL_PORT,
			//secure: process.env.SECURE,
			auth: {
                user: 'edurainbow.info@gmail.com',
                pass: 'bbvlxfenzfnrfxrv'
			},
		});

		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};