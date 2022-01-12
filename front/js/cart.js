// ------------------------Panier------------------------
// Récup élements produits du localStorage
let storage = JSON.parse(localStorage.getItem("product"))
// Gestion panier vide
function shopEmptyManage() {
    if(storage == null) {
        document.querySelector("h1").innerText = "Votre panier est vide"
        document.querySelector(".cart__price").innerHTML = ""
    }
}
shopEmptyManage();
// Affichage récapitulatif des produits dans le panier
function shopDisplay() {
    let productsDisplay = document.getElementById("cart__items")
}
storage.forEach(product => {
    console.log(product)
});











// ------------------------Confirmations------------------------