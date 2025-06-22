import nodemailer from "nodemailer";

export default async function sendEmail(req, res) {
    
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Metodo não permitido: " + req.method })
    }

    try {

        const {name, tel} = req.body

        const transporter = nodemailer.createTransport({
            service: process.env.SERVICE,
            auth: {
                user: process.env.EMAIL_FROM,
                pass: process.env.EMAIL_PASS,
            },
        })

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
            text-align: center;
            background: linear-gradient(60deg, #0172cf, #5bbab4 100%);
            min-height: 98dvh;
        }

        h1,h2 {
            font-family: "Sansation";
            color: #005aa3;
        }

        h2 {
            font-family: "Ancizar Sans";
            color: #f39200;
        }

        main {
            text-align: center;
            border-radius: .25rem;
            width: 60%;
            background-color: #fefff3;
        }

        img[alt="logo caixa aqui"] {
            border-radius: 0 1rem 0 1rem;
            width: calc(164px / 1.35);
            height: calc(96px / 1.35);
        }

        img[alt="dream house"] {
            border-radius: 1rem 0 1rem 0;
            width: calc(164px / 1.4);
            height: calc(111px / 1.4);
        }

        #logos {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            flex-direction: row;
            padding-top: 2rem;
        }

        .line {
            width: 2px;
            min-width: 2px;
            min-height: 100%;
            border-radius: 1rem;
            background: linear-gradient(180deg, #005aa3, #5bbab4 100%);
        }

        .question {
            background-color: #e1e2da;
            border-radius: 1rem;
            text-align: center;
        }

        @media (max-width: 950px) {
            main {
                width: 100%;
            }
        }
    </style>
</head>

<body>
    <main>
        <div id="logos">
            <img src="https://res.cloudinary.com/dxyktq9kw/image/upload/v1750614861/logo-caixa-aqui_kvv5bg.png"
                alt="logo caixa aqui">
            <div class="line"></div>
            <img src="https://res.cloudinary.com/dxyktq9kw/image/upload/v1750614868/house_twnenq.jpg" alt="dream house">
        </div>
        <br>
        <h1>Dados da Solicitação:</h1>
        <br>
        <div class="question">
            <h1>Nome</h1>
            <h2>${name}</h2>
        </div>
        <div class="question">
            <h1>Telefone</h1>
            <h2>${tel}</h2>
        </div>
    </main>
</body>

</html>`

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            subject: `MANDARAM UM EMAIL PARA VOCÊ!!!`,
            html: fullHTML,
        }

        // Aguarda o envio do e-mail
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Email enviado com sucesso!" })
    } catch (error) {
        console.error("ocorreu um erro enviando o email: ", error)
        res.status(500).json({ error: "falha no envio do email!" })
    }
}
