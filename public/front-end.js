const button = document.body.querySelector("button#send")

button.addEventListener("click", () => {
    fetch("/info")
    .then(response => console.log(response))
})