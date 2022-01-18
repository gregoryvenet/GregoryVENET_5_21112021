// Auto appel des fonctions
(async function () {
    let products = await getProducts()
    shopManage(products);
    removeElement(storage)
})()

// recup des produits avec l'API
function getProducts() {
    return fetch("http://localhost:3000/api/products") 
        .then(res => res.json())
        .catch(err => alert("Problème de chargement des produits.\n Veuillez nous excuser du désagrément.\n Nous mettons tout en oeuvre pour régler le problème."))
}
// ------------------------Panier------------------------
// Récup élements produits du localStorage

let storage = JSON.parse(localStorage.getItem("storage"))
// Gestion panier
function shopManage(products) {
    if(storage == null) {
        document.querySelector("h1").innerText = "Votre panier est vide"
        document.querySelector(".cart__price").innerHTML = ""
    } else {
        let productsDisplay = document.getElementById("cart__items")
        let totalProduct = document.getElementById("totalQuantity")
        let totalPrice = document.getElementById("totalPrice")
        storage.forEach(element => {
            productsDisplay.innerHTML += `<article class="cart__item" data-id="${element.Id}" data-color="${element.Color}">
                                            <div class="cart__item__img">
                                            <img src="${element.imgSrc}" alt="${element.altTxt}">
                                            </div>
                                            <div class="cart__item__content">
                                            <div class="cart__item__content__description">
                                                <h2>${element.name}</h2>
                                                <p>${element.color}</p>
                                                <p>${products.price} €</p>
                                            </div>
                                            <div class="cart__item__content__settings">
                                                <div class="cart__item__content__settings__quantity">
                                                <p>Qté : </p>
                                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantity}">
                                                </div>
                                                <div class="cart__item__content__settings__delete">
                                                <p class="deleteItem">Supprimer</p>
                                                </div>
                                            </div>
                                            </div>
                                        </article>`
            console.log(products.quantity);
        }); 
    }
}