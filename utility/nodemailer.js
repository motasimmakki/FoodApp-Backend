const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
const sendMail = async function(context, user) {
    // context -> signup OR forgetpassword
    try {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: "makkimotasim@gmail.com", // Setting sender's email
            pass: "cenjywaueqfouhyv", // App password from google account
            },
        });
        let email_subject = "", email_html = "";
        if(context == "signup") {
            email_subject = `Thank You for Signing Up ${user.name}!`,
            email_html= `
                <h1>Welcome to foodApp.com</h1>
                Hope you enjoy the meal, And have a great experience!

                Here is your details:
                Name: ${user.name}
                Email: ${user.email}

                Thankyou!

                                                    FoodApp Developer,
                                                    Motasim
            `;
        } else if(context == "forgetpassword") {
            email_subject = `Reset Password!`,
            email_html= `
                <h1>Reset Password for foodApp.com!</h1>
                Here is your link to reset your password:

                ${user.resetPasswordLink}

                Thankyou!

                                                    FoodApp Developer,
                                                    Motasim
            `;
        }

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"FoodApp 🍴" <makkimotasim@gmail.com>', // sender address
            to: user.email, // list of receivers (comma separated)
            subject: email_subject, // Subject line
            // text: "Hello world?", // plain text body
            html: email_html // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    } catch(err) {
        console.log(err.message);
    }
}

module.exports = { sendMail }
