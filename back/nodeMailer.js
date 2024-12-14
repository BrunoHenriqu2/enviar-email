import nodemailer from "nodemailer"
import dotenv from "dotenv"

export default async function sendEmail() {
    dotenv.config()

    const transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        auth: {
            user: process.env.EMAIL_FROM,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: "Message title",
        text: "Plaintext version of the message",
        html: "<p>HTML version of the message</p>",
    }

    transporter.sendMail(mailOptions, (error) => {
        console.log(error)
    })
}