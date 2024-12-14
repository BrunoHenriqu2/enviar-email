const button = document.body.querySelector("button#send")

button.addEventListener("click", () => {
    fetch("/info")
    .then(response => response.text())
    .then(data => console.log(data))
})