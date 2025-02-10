// Récupération des pièces depuis le fichier JSON
// const reponse = await fetch("http://localhost:5678/api/users/login")
// console.log (fetch)

// const login = await reponse.json();
// console.log (login)

// Submit
const form = document.querySelector('form');
form.addEventListener("submit", async(event) => {
    event.preventDefault()
    console.log(event.target.email.value);

    const dataform = {
        email: event.target.email.value,
        password: event.target.password.value
    }

    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify (dataform)
    })

        if (!response.ok) {
            console.log("Erreur dans l’identifiant ou le mot de passe")
        }
        else {
            const data = await response.json()
            console.log(data)
            console.log(data.token)

            window.localStorage.setItem("token", data.token);
            // window.location.href = 'index.html?mode=edition'
        }

});
