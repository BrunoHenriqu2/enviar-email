const button = document.body.querySelector("button#send")

button.addEventListener("click", () => {
    fetch("https://enviar-email-omega.vercel.app/")
})