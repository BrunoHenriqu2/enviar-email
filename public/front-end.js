const button = document.body.querySelector("button#send")

button.addEventListener("click", () => {
    fetch("/")
    .then(response => console.log(response))
})