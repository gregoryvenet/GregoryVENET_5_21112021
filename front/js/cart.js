// Auto appel des fonctions
(async function() {
    let product = await getProduct()
    shopManage()
    updateQuantity()
    removeElement()
    totalQuantity()
    price(product)
    totalPrice()
})()
// recup des produits avec l'API
function getProduct(product) {
    return fetch("http://localhost:3000/api/products/") 
        .then(res => res.json())
        .catch(error => alert("Problème de chargement des produits.\n Veuillez nous excuser du désagrément.\n Nous mettons tout en oeuvre pour régler le problème."))
}
// Récup élements produits du localStorage
function getStorage() {
    return JSON.parse(localStorage.getItem("storage"))
}
// Envoi des élements au localStorage
function saveStorage() {
    localStorage.setItem("storage", JSON.stringify(getStorage()))
}

// Gestion panier
function shopManage() {
    // Action si panier vide ou plein
    if(getStorage() == null) {
        document.querySelector("h1").innerText = "Votre panier est vide"
        document.querySelector(".cart__price").innerHTML = ""
    } else {
        let displayProduct = document.getElementById("cart__items")
        getStorage().forEach(element => {
            displayProduct.innerHTML += `<article class="cart__item" data-id="${element.Id}" data-color="${element.Color}">
                                            <div class="cart__item__img">
                                            <img src="${element.imgSrc}" alt="${element.altTxt}">
                                            </div>
                                            <div class="cart__item__content">
                                            <div class="cart__item__content__description">
                                                <h2>${element.name}</h2>
                                                <p>${element.color}</p>
                                                <p id="priceProduct"> €</p>
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
        })
    }
}
// changement des quantités avec la maj du localStorage
function updateQuantity() {
    let itemQuantity = document.querySelectorAll(".itemQuantity");
    itemQuantity.forEach((element, i) => {
        itemQuantity[i].addEventListener("change" , () => {
            let quantityModif = Number(getStorage()[i].quantity)
            let itemQuantityValue = Number(itemQuantity[i].value)
            if (quantityModif != itemQuantityValue) {
                quantityModif = itemQuantityValue
                saveStorage();
                // console.log(typeof(quantityModif))
                // console.log(typeof(itemQuantityValue))
                console.log(quantityModif);
                console.log(itemQuantityValue);
                location.reload();
            }
        })
    })
}
// Fonction suppression du produit dans le panier
function removeElement() {
    let deleteItem = document.querySelectorAll(".deleteItem")
    deleteItem.forEach((btn, i) => {
        btn.addEventListener("click", () => {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce(s) produit(s)?")) {
                getStorage().splice(i, 1)
                saveStorage()
                // location.reload();
            }
        })
    })
}
// Calcul et affichage des quantités
function totalQuantity() {
    let totalQuantity = document.getElementById('totalQuantity')
    let quantityProduct = document.querySelectorAll('.itemQuantity')
    let totalNumber = 0;
    quantityProduct.forEach(quantity =>{
    totalNumber += Number(quantity.value)
    })
    return totalQuantity.innerHTML = totalNumber
}
// Ajout Prix de l'API
function price(product) {
    let getPriceDom = document.querySelectorAll("#priceProduct")
    getPriceDom.forEach((element, i) => {
        product.find((item, j) => {
            let getIdProduct = product[j]._id
            let getIdStorage = getStorage()[i].Id
            if (getIdStorage === getIdProduct) {
                getPriceDom.innerText = product[j].price
                console.log(getPriceDom)
            }
        })
    });
}
// Calcul des prix
function totalPrice() {
    let totalPrice = document.getElementById("totalPrice")
    let priceProduct = document.querySelectorAll(".priceProduct")
    totalPriceProducts = 0;
    priceProduct.forEach(price => {
        total += Number(price.textContent)
    })
    return totalPrice.innerHTML = totalPriceProducts;
}

