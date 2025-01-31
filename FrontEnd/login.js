// Récupération des pièces depuis le fichier JSON
// const reponse = await fetch("http://localhost:5678/api/users/login")
// console.log (fetch)

// const login = await reponse.json();
// console.log (login)

// Submit
const form = document.querySelector('form');
form.addEventListener("submit", (event) => {
    event.preventDefault()
    console.log("Aucun rechargement de page");

//     const usernameId = {
//         email: event.target.getElementById("email".value)
//         password: event.target.getElementById("password".value)
//     }

});

// Création de la charge utile en JSON
// const chargeUtile = JSON.stringify (usernameId)
// console.log (usernameId)

// Appel de la fonction fetch avec toutes les informations nécessaires
// fetch("http://localhost:5678/api/users/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: chargeUtile
// });