import nodemailer from "nodemailer";
import dotenv from "dotenv";

export default async function sendEmail(req, res) {
    
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Metodo não permitido: " + req.method });
    }

    dotenv.config();

    try {

        const {name, tel} = req.body

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
            subject: "Nova Simulação!",
            text: `
                nome: ${name}
                telefone: ${tel}
            `,
            //html: "<h1>HTML version of the message</h1>",
        };

        // Aguarda o envio do e-mail
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Email enviado com sucesso!" });
    } catch (error) {
        console.error("ocorreu um erro enviando o email: ", error);
        res.status(500).json({ error: "falha no envio do email!" });
    }
}
