const form = document.querySelector('form');
form.addEventListener("submit", async(event) => {
    event.preventDefault()

    const dataform = {
        email: event.target.email.value,
        password: event.target.password.value
    }

    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify (dataform)
    })

        if (response.ok) {
            const data = await response.json()

            window.localStorage.setItem("token", data.token);
            window.location.href = 'index.html'
            document.getElementById('id-error').style.display = "none";
        } else {
            document.getElementById('id-error').style.display = "block";
        }
});