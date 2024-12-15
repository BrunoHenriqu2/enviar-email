import nodemailer from "nodemailer";
import dotenv from "dotenv";

export default async function sendEmail(req, res) {
    dotenv.config();

    try {
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
        };

        // Aguarda o envio do e-mail
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Email enviado com sucesso!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "falha no envio do email!" });
    }
}
