// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("http://localhost:5678/api/works")

console.log (reponse)

const objets = await reponse.json();
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
    // Filtre Tous
    const filtresTous = document.getElementById("filtresTous")
    filtresTous.addEventListener("click", function () {
       const tousFiltres = objets.filter(function (objets) {
        return objets.userId == 1})
        console.log(tousFiltres)

    // Effacement de la gallerie et regénération de la page
    document.querySelector(".gallery").innerHTML = "";
    genererObjets(tousFiltres);
});
    
// Filtre Objets
        const filtresObjets = document.getElementById("filtresObjets")
        filtresObjets.addEventListener("click", function () {
           const objetsFiltres = objets.filter(function (objets) {
            return objets.categoryId == 1})
            console.log(objetsFiltres)
    
    // Effacement de la gallerie et regénération de la page
        document.querySelector(".gallery").innerHTML = "";
        genererObjets(objetsFiltres);
    });
        
    // Filtre Appartements
    const filtresAppartements = document.getElementById("filtresAppartements")
    filtresAppartements.addEventListener("click", function () {
       const appartsFiltres = objets.filter(function (objets) {
        return objets.categoryId == 2})
        console.log(appartsFiltres)

    // Effacement de la gallerie et regénération de la page
    document.querySelector(".gallery").innerHTML = "";
    genererObjets(appartsFiltres);
});
    
    // Filtre Hôtels
    const filtresHotels = document.getElementById("filtresHotels")
    filtresHotels.addEventListener("click", function () {
       const hotelsFiltres = objets.filter(function (objets) {
        return objets.categoryId == 3})
        console.log(hotelsFiltres)
        
    // Effacement de la gallerie et regénération de la page
    document.querySelector(".gallery").innerHTML = "";
    genererObjets(hotelsFiltres);
});
    
// Mise à jour de l'affichage

