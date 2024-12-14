import sendEmail from  "./nodeMailer.js";
import express from "express"

const expressApp = express()

expressApp.get("/info", (req, res) => {
    res.send("Info sobre o projeto")
})

expressApp.listen(3000, () => {
    console.log("Servidor rodando na porta 3000!");
})