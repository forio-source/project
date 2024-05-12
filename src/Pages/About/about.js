const form = document.querySelector(".container4 > form");
form.addEventListener("submit", (e) => {
    e.preventDefault()
    let { target } = e;
    let name = target.name.value;
    let email = target.email.value;
    let message = target.message.value;
    
    if (!name) {
        console.log("Name is required");
    }
    else if (!email) {
        console.log("Email is required");
    }
    else if (!message) {
        console.log("Message is required");
    }
    else {
        console.log("Sent");
    }
})