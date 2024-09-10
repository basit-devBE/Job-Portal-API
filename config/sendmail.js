import nodemailer from 'nodemailer';
import { config as configDotenv } from 'dotenv';
import hbs from 'nodemailer-express-handlebars';
import  path  from 'path';

// Load environment variables from .env file
configDotenv();

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_SECRET_KEY,
    },
});

transporter.use('compile', hbs({
    viewEngine: {
        extname: '.hbs',
        layoutsDir:path.resolve('../Job-Portal-API/templates'),
        defaultLayout: false,
        partialsDir: path.resolve('../Job-Portal-API/templates'),
    },
    viewPath: path.resolve('../Job-Portal-API/templates'),
    extname: '.hbs'
}));

// Function to send mail
const sendMail = (receivinguser, subject, email_template,context) => {
    return transporter.sendMail({
        from: "mohammedbasit362@gmail.com",
        to: receivinguser,
        subject: subject,
        template: email_template,
        context: context
        
    });
};

export default sendMail;
