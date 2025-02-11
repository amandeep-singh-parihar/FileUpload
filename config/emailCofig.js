const nodemailer = require("nodemailer");
require("dotenv").config();

//transporter -> it should it be in config
let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});
/*
    nodemailer.createTransport({...})
    -> Creates a transport service for sending emails using nodemailer.
    -> Uses environment variables (process.env) to keep credentials secure.

    host: process.env.MAIL_HOST
    -> The SMTP server used to send emails (e.g., Gmail, Mailtrap, SendGrid).

    auth: { user, pass }
    -> user: The sender's email address.
    -> pass: The sender's email password or API key.
*/

module.exports = transporter;
