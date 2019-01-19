const nodemailer = require('nodemailer');

module.exports = {
    
    invite() {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'fjoapqba6ipgcvyd@ethereal.email', // generated ethereal user
                pass: 'CkstJsKWFgAkFEtHb6' // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Request to Join" <fjoapqba6ipgcvyd@ethereal.email>', // sender address
            to: 'sujithsrt10@gmail.com', // list of receivers
            subject: 'Join "RealApp"', // Subject line
            text: 'Hello world?', // plain text body
            html: '<b>Hello world?</b>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            res.status(200).send({
                message: 'Success'
            })
            
        });
    }
}