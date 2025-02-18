// Récupération des objets depuis le fichier JSON works
const response = await fetch("http://localhost:5678/api/works")

const objets = await response.json();

// Fonction qui génère toute la page web
function genererObjets(objets) {
for (let i=0; i<objets.length; i++) {

const article = objets[i];
    
const imageElement = document.createElement("img");
imageElement.src = article.imageUrl;
imageElement.alt = article.title;

const nomElement = document.createElement("figcaption");
nomElement.innerText = article.title;

const figureElement = document.createElement("figure");
figureElement.appendChild (imageElement);
figureElement.appendChild (nomElement);


const section = document.getElementById("gallery");
section.appendChild (figureElement)
}
}

// Affichage de tous les objets
genererObjets(objets)

// Boutons de filtres
    
// Récupération des objets depuis le fichier JSON categories
const responseCategories = await fetch("http://localhost:5678/api/categories");
const categories = await responseCategories.json();

function addButton(name) {
    const button = document.createElement("button");
    button.className = "box-filtres";
    button.innerHTML = name;

    button.addEventListener('click', function() {
        const filteredObjects = objets.filter(function (objets) {
            return objets.category.name == name
        })

        document.querySelector(".gallery").innerHTML ="";

        if (name == 'Tous') {
            genererObjets(objets); 
        } else {
            genererObjets(filteredObjects)
        }

    })

    document.getElementById('container-box-filtres').appendChild(button);
}

addButton('Tous')
for (let i=0; i<categories.length; i++) {
    addButton(categories[i].name)
}

// //Fonction d'affichage des éléments pour le Mode Edition
function afficherModeEdition() {
    document.getElementById('mode-edition-header').style.display = "block";
    document.getElementById('login').style.display = "none";
    document.getElementById('logout').style.display = "block";
    document.getElementById('mode-edition-portfolio').style.display = 'block';
    document.getElementById('container-box-filtres').style.display = 'none';
}

// //Fonction d'affichage des éléments pour le Mode visiteur
function masquerModeEdition() {
    document.getElementById('mode-edition-header').style.display = 'none';
    document.getElementById('login').style.display = 'block';
    document.getElementById('logout').style.display = 'none';
    document.getElementById('mode-edition-portfolio').style.display = 'none';
}

// Vérification de la validité du token
const token = localStorage.getItem("token");

if (token) {
    afficherModeEdition();
} else {
    masquerModeEdition();
}

// Log out
// function supprimerToken(token) {
//     (localStorage.removeItem("token");
//     console.log(`Le token a été supprimé avec succès.`);
//     )
// }


// document.getElementById('logout').addEventListener('click', function () {
//     supprimerToken(token);
// });