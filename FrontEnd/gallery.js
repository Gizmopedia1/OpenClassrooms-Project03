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

// Dynamisation des boutons de filtres
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

// Vérification de la présence du token
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

// Modale (ouverture/fermeture)
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
    document.getElementById("formAjout").reset();
    document.getElementById("preview").style.display = 'none';
    document.getElementById("ajoutImageDiv").style.display = 'flex';
    document.getElementById('submit-button').classList.remove('submit-button-fill');
    document.getElementById('submit-button').classList.add('submit-button');
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

// Fonction qui génère la galerie de la modale
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
        boutonPoubelle.addEventListener('click', async (event) => {
            const id = event.target.dataset.id;

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


// Menu déroulant Catégories
fetch("http://localhost:5678/api/categories")
.then(responseOptionCategories => responseOptionCategories.json())
.then(data => {
    const select = document.getElementById('category');
    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.name;
        select.appendChild(option);
    });
})




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

// Event Listeners sur les clics de changement de modale
document.getElementById('boutonAjout').addEventListener('click', modaleAjoutPhoto);
document.getElementById('retour-modal').addEventListener('click', modaleSupprPhoto);
document.getElementById('modal1').addEventListener('click', modaleSupprPhoto);

// Prévisualisation d'une image ajoutée
const fileInput = document.getElementById("inputAjoutImages");
const preview = document.getElementById("preview");
const ajoutImageDiv = document.getElementById("ajoutImageDiv");

fileInput.addEventListener('change', function() {
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
            ajoutImageDiv.style.display = 'none';
        }

        reader.readAsDataURL(file); // lit le fichier comme URL de données
    }
});

// Bouton Submit quand les Inputs sont vides
const form = document.getElementById("formAjout");
const titleInput = document.getElementById('title');
const categoryInput = document.getElementById('category');
const submitButton = document.getElementById('submit-button');

// Fonction pour vérifier si tous les champs sont remplis
function checkFormCompletion() {
    if (titleInput.value && categoryInput.value && fileInput.files.length > 0) {
        submitButton.classList.remove('submit-button');
        submitButton.classList.add('submit-button-fill');
    } else {
        submitButton.classList.remove('submit-button-fill');
        submitButton.classList.add('submit-button');
    }
}

// Ajoutez un événement "input" à chacun des champs pour vérifier à chaque saisie
titleInput.addEventListener('input', checkFormCompletion);
categoryInput.addEventListener('change', checkFormCompletion);
fileInput.addEventListener('change', checkFormCompletion);


// // Formulaire d'ajout d'images
const formAjout = document.getElementById("formAjout");

formAjout.addEventListener("submit", async(event) => {
    event.preventDefault()

    const formData = new FormData(formAjout); // Créez un objet FormData à partir du formulaire

    // Récupérez les valeurs
    const image = formData.get('image'); // Récupère le fichier image
    const title = formData.get('title'); // Récupère le titre
    const category = formData.get('category'); // Récupère la catégorie
    
    // Vérification

    try {
        const responseImage = await fetch("http://localhost:5678/api/works", {
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: formData
        });

        if (responseImage.ok) {

            const response = await fetch("http://localhost:5678/api/works")
            const objets = await response.json();
            document.getElementById("modal-gallery").innerHTML = ""
            genererObjetsmodal(objets);
            document.getElementById("gallery").innerHTML = ""
            genererObjets(objets);
            document.getElementById("formAjout").reset();
            document.getElementById("preview").style.display = 'none';
            document.getElementById("ajoutImageDiv").style.display = 'flex';
            console.log("L'objet a été ajouté avec succès.")
            modaleSupprPhoto();
        
        } else {
            console.log("Une erreur s'est produite lors de l'envoi des données.");
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
});