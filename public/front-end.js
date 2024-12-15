// const button = document.body.querySelector("button#send")

// button.addEventListener("click", () => {
//     fetch("/info")
//         .then(response => response.text()) // Acessando o corpo da resposta como texto
//         .then(data => console.log(data))
//         .catch(error => console.error(error));
// })

const button = document.body.querySelector("button#send");

button.addEventListener("click", () => {
    fetch("/api/sendEmail")
});