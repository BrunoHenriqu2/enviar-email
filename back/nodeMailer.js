import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

export default async function sendEmail() {

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: "Message title",
        text: "Plaintext version of the message",
        html: "<p>HTML version of the message</p>",
    }

    nodemailer.createTransport(mailOptions)
}