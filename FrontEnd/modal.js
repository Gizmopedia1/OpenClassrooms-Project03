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
const response = await fetch("http://localhost:5678/api/works")
const objets = await response.json();

// Fonction qui génère toute la page web
function genererObjets(objets) {
    for (let i=0; i<objets.length; i++) {

        const article = objets[i];

        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        
        const dataID = article.id;
        const boutonPoubelle = document.createElement("button");
        boutonPoubelle.classList.add("boutonPoubelle")
        boutonPoubelle.setAttribute("data-id", dataID);
        boutonPoubelle.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

        const figureElement = document.createElement("figure");
        figureElement.appendChild (imageElement);
        figureElement.appendChild (boutonPoubelle);

        const section = document.getElementById("modal-gallery");
        section.appendChild (figureElement)
    }
}

// Affichage de tous les objets
genererObjets(objets)

// Recupération de l'ID de chaque objet au clic
const buttons = document.querySelectorAll(".boutonPoubelle");
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const id = event.target.dataset.id; // Récupération de l'id ici
        console.log('ID à supprimer:', id); // Vérifiez l'ID

        // Appelez votre fonction de suppression ici en utilisant cet id
    });
});