import nodemailer from "nodemailer"
import dotenv from "dotenv"
import { error } from "console";

dotenv.config()

export default async function () {

    const transporter = nodemailer.createTransport({
        host: '/',
        port: 587,
        secure: false,
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