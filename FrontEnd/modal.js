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
        imageElement.alt = article.title;
        
        const boutonPoubelle = document.createElement("button");
        boutonPoubelle.classList.add("boutonPoubelle")
        boutonPoubelle.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        const dataID = article.id;
        boutonPoubelle.setAttribute("data-id", dataID);

        const figureElement = document.createElement("figure");
        figureElement.appendChild (imageElement);
        figureElement.appendChild (boutonPoubelle);
        figureElement.setAttribute("data-id", dataID);

        const section = document.getElementById("modal-gallery");
        section.appendChild (figureElement)
    }
}

// Affichage de tous les objets
genererObjets(objets)


// function supprimerObjets() {
// Recupération de l'ID de chaque objet au clic
    const buttons = document.querySelectorAll(".boutonPoubelle");
    
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const id = event.target.dataset.id; // Récupération de l'id
            console.log('ID à supprimer:', id); // Vérifiez l'ID

            try {
                const response = fetch(`http://localhost:5678/api/works/${id}`, {
                    method: "DELETE",
                    headers: {
                        headers: {"Content-Type": "application/json"},
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                
                if (response.ok) {
                    // Supprimer l'élément du DOM
                    const elementSuppression = document.getElementById(id); // Assurez-vous que l'élément a un id
                    elementSuppression.remove(figure);
                    genererObjets(objets)

                    alert('Élément supprimé avec succès !');
                } else {
                    alert('Erreur lors de la suppression.');
                }
            } catch (error) {
                console.error('Erreur:', error);
            }
        });
    });
