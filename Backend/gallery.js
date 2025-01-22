// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("gallery.json");
const objets = await reponse.json();

const article = objets[0];
 const imageElement = document.createElement("img");
 imageElement.src = article.image;
 const nomElement = document.createElement("p");
 nomElement.innerText = article.title;

const sectionGallery = document.querySelector(".gallery");

sectionGallery.appendChild(imageElement);
sectionGallery.appendChild(nomElement);