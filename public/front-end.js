// const button = document.body.querySelector("button#send")

// button.addEventListener("click", () => {
//     fetch("/info")
//         .then(response => response.text()) // Acessando o corpo da resposta como texto
//         .then(data => console.log(data))
//         .catch(error => console.error(error));
// })

let button = document.querySelector("button#send");
let inputName = document.querySelector("input#name")
let inputTel = document.querySelector("input#tel")

button.addEventListener("click", () => {
    fetch("/api/sendEmail", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name: inputName.value, tel: inputTel.value})
    })
});