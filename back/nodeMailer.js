import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

// export default async function () {

//     const transporter = nodemailer.createTransport({
//         service: process.env.SERVICE,
//         auth: {
//           user: process.env.EMAIL_FROM,
//           pass: process.env.EMAIL_PASS,
//         },
//       });

//     const mailOptions = {
//         from: process.env.EMAIL_FROM,
//         to: process.env.EMAIL_TO,
//         subject: "Message title",
//         text: "Plaintext version of the message",
//         html: "<p>HTML version of the message</p>",
//     }

//     transporter.sendMail(mailOptions, (error) => {
//         console.log(error)
//     })
// }

// Vercel function

exports.handler = async (request, response) => {

    // Configure o transporte com suas credenciais
    const transporter = nodemailer.createTransport({
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

    try {
        await transporter.sendMail(mailOptions);
        response.status(200).json({ message: 'Email enviado com sucesso!' });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Erro ao enviar email' });
    }
};