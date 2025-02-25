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
document.getElementById('logout').addEventListener('click', logout);

function logout() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}

let modal = null

const openModal = function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href"))
    target.style.display = null
    target.setAttribute("aria-hidden", false)
    target.setAttribute("aria-modal", true)
    modal = target
    modal.addEventListener("click", closeModal)
    modal.querySelector(".close-modal").addEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
}

const closeModal = function(e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute("aria-hidden", true)
    modal.removeAttribute("aria-modal")
    modal.removeEventListener("click", closeModal)
    modal.querySelector(".close-modal").removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)
    modal = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal)
})

// Récupération des objets depuis le fichier JSON works
const responseModal = await fetch("http://localhost:5678/api/works")
const objetsModal = await responseModal.json();

// Fonction qui génère toute la page web
function genererObjetsmodal(objets) {
    for (let i=0; i<objets.length; i++) {

        const article = objets[i];
        const dataID = article.id;

        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        imageElement.alt = article.title;
        
        const boutonPoubelle = document.createElement("button");
        boutonPoubelle.classList.add("boutonPoubelle")
        boutonPoubelle.innerHTML = '<i class="fa-solid fa-trash-can" data-id="'+dataID+'"></i>';
        boutonPoubelle.setAttribute("data-id", dataID);

        const figureElement = document.createElement("figure");
        figureElement.appendChild (imageElement);
        figureElement.appendChild (boutonPoubelle);
        figureElement.setAttribute("data-id", dataID);
        figureElement.setAttribute("id", dataID)

        const section = document.getElementById("modal-gallery");
        section.appendChild (figureElement)
    }
}

// Affichage de tous les objets
genererObjetsmodal(objetsModal);


// async function supprimerObjets(id, figure) {
    const buttons = document.querySelectorAll(".boutonPoubelle");
    
    buttons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const id = event.target.dataset.id;
            console.log('ID à supprimer:', id);

            try {
                const response = await fetch (`http://localhost:5678/api/works/${id}`, {
                    method: "DELETE",
                    headers: {
                        headers: {"Content-Type": "application/json"},
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                
                if (response.ok) {
                    
                    const response = await fetch("http://localhost:5678/api/works")
                    const objets = await response.json();
                    document.getElementById("modal-gallery").innerHTML = ""
                    genererObjetsmodal(objets);
                    document.getElementById("gallery").innerHTML = ""
                    genererObjets(objets);

              
                } else {
                    console.log('Erreur lors de la suppression.');
                }
            } catch (error) {
                console.error('Erreur:', error);
            }
        });
    });
// }

// Menu déroulant Catégories
fetch("http://localhost:5678/api/categories")
.then(responseOptionCategories => responseOptionCategories.json())
.then(data => {
    const select = document.getElementById('categories');
    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.name;
        option.textContent = item.name;
        select.appendChild(option);
    });
})

// Bouton Submit quand les Inputs sont vides
// let submitVide = document.getElementById("boutonValider");

// submitVide.addEventListener("#modal-ajout input", e => {
//   if (e.target.value !== "") {
//     e.target.style.backgroundColor = #1D6154;
//   } else {
//     e.target.style.backgroundColor = #A7A7A7;
//   }
// });

// //Fonction de passage à la modale d'ajout de photo
function modaleAjoutPhoto() {
    document.getElementById('modal-suppression').style.display = "none";
    document.getElementById('modal-ajout').style.display = "block";
}

// //Fonction de retour à la modale de suppression de photo
function modaleSupprPhoto() {
    document.getElementById('modal-ajout').style.display = "none";
    document.getElementById('modal-suppression').style.display = "block";
}

// Vérification de la validité du token
document.getElementById('boutonAjout').addEventListener('click', modaleAjoutPhoto);
document.getElementById('retour-modal').addEventListener('click', modaleSupprPhoto);