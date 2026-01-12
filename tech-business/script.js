function submitForm() {
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    if (name === "" || message === "") {
        alert("Please fill in all fields.");
    } else {
        alert("Thank you, " + name + "! Your message has been sent.");
    }
}