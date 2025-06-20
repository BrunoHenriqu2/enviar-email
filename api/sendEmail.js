import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config()

export default async function sendEmail(req, res) {
    
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Metodo não permitido: " + req.method });
    }

    try {

        const {name, tel} = req.body

        const transporter = nodemailer.createTransport({
            service: process.env.SERVICE,
            auth: {
                user: process.env.EMAIL_FROM,
                pass: process.env.EMAIL_PASS,
            },
        });

        let fullHTML = `<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Casa dos Sonhos - Formulário</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Ancizar+Sans:ital,wght@0,100..1000;1,100..1000&family=Sansation:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap&family=WDXL+Lubrifont+TC&display=swap');

        :root {
            --blue: #005aa3;
            --mid-blue: #0172cf;
            --light-blue: #5bbab4;
            --cream-white: #fefff3;
            --mid-white: #f7f8ed;
            --dark-white: #e1e2da;
            --orange: #f39200;
        }

        body {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            gap: 1rem;
            font-family: "Sansation";
            background: linear-gradient(60deg, #005aa3, #5bbab4 100%);
        }

        h2 {
            font-family: "Ancizar Sans";
            color: var(--orange)
        }

        main {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 0;
            border-radius: .25rem;
            width: 60%;
            min-height: 100dvh;
            color: #0172cf;
            background-color: #fefff3;
        }
    </style>
</head>

<body>
    <main>
        <h1>Dados da Solicitação:</h1>
        <h2>Nome</h2>
        <h2>${name}</h2>
        <h2>Telefone</h2>
        <h2>${tel}</h2>
    </main>
</body>

</html>`

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            subject: `MANDARAM UM EMAIL PARA VOCÊ!!!`,
            html: fullHTML,
        };

        // Aguarda o envio do e-mail
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Email enviado com sucesso!" });
    } catch (error) {
        console.error("ocorreu um erro enviando o email: ", error);
        res.status(500).json({ error: "falha no envio do email!" });
    }
}
