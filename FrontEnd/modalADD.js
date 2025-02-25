// let modalADD = null

// const openModalADD = function (e) {
//     e.preventDefault()
//     const target = document.getElementById(boutonAjout)
//     target.style.display = null
//     target.setAttribute("aria-hidden", false)
//     target.setAttribute("aria-modal", true)
//     modalADD = target
//     modalADD.addEventListener("click", closeModalADD)
//     modalADD.querySelector(".close-modal").addEventListener("click", closeModalADD)
//     modalADD.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
// }

// const closeModalADD = function(e) {
//     if (modalADD === null) return
//     e.preventDefault()
//     modalADD.style.display = "none"
//     modalADD.setAttribute("aria-hidden", true)
//     modalADD.removeAttribute("aria-modal")
//     modalADD.removeEventListener("click", closeModalADD)
//     modalADD.querySelector(".close-modalADD").removeEventListener("click", closeModalADD)
//     modalADD.querySelector(".js-modalADD-stop").removeEventListener("click", stopPropagation)
//     modalADD = null
// }

// const stopPropagation = function (e) {
//     e.stopPropagation()
// }

// document.querySelectorAll(".boutonAjout").forEach(a => {
//     a.addEventListener("click", openModalADD)
// })

