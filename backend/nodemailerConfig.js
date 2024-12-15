import nodemailer from "nodemailer"
import dotenv from "dotenv"

export default function nodemailerConfig() {
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
        html: "<h1>HTML version of the message</h1>",
    }

    transporter.sendMail(mailOptions)
}
