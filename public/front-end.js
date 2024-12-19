
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