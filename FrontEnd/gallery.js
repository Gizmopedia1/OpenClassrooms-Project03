// Récupération des objets depuis le fichier JSON works
const response = await fetch("http://localhost:5678/api/works")

console.log (response)

const objets = await response.json();
console.log (objets)

// Fonction qui génère toute la page web
function genererObjets(objets) {
for (let i=0; i<objets.length; i++) {

const article = objets[i];
    
console.log (article)

const imageElement = document.createElement("img");
imageElement.src = article.imageUrl;
console.log (imageElement)

const nomElement = document.createElement("figcaption");
nomElement.innerText = article.title;
console.log (nomElement)

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