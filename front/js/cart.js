// Auto appel des fonctions
(async function() {
    // let productId = getProductId()
    let product = await getProducts()
    displayCart()
    updateQuantityEvent()
    removeElementEvent()
    totalQuantity()
    price(product)
    // totalPrice()
    form()
})()

// recup des produits avec l'API
function getProducts() {
    return fetch("http://localhost:3000/api/products/") 
        .then(res => res.json())
        .catch(error => alert("Problème de chargement des produits.\n Veuillez nous excuser du désagrément.\n Nous mettons tout en oeuvre pour régler le problème."))
}

// Récup élements produits du localStorage
function getStorageProduct() {
    return JSON.parse(localStorage.getItem("products"))
}

// Gestion panier
function displayCart() {

    // Action si panier vide ou rempli
    if(getStorageProduct() == null) {
        document.querySelector("h1").innerText = "Votre panier est vide"
        document.querySelector(".cart__price").innerHTML = ""
    } else {
        let displayProduct = document.getElementById("cart__items")
        getStorageProduct().find(element => {
            displayProduct.innerHTML += `
            <article class="cart__item" data-id="${element.id}" data-color="${element.color}">
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
// Ajout Prix de l'API
// function price(product) {
//     let getPriceDom = document.querySelectorAll("#priceProduct");

//     getPriceDom.forEach((element, i) => {
//         product.forEach((item, j) => {
//             let getIdProduct = product[j]._id
//             let getIdStorage = getStorageProduct()[i].Id
//             if (getIdStorage === getIdProduct) {
//                 getPriceDom == product[j].price
//             }
//         })
//     })
// }
// changement des quantités avec update du localStorage
function updateQuantityEvent() {
    let inputQuantity = document.querySelectorAll(".itemQuantity");
    let storage = JSON.parse(localStorage.getItem("products"));
        storage.forEach((eltItem, i) => {
        inputQuantity[i].addEventListener("change",() => {
            let objIndex = storage.findIndex(item=> item.id === eltItem.id && item.color === eltItem.color)
            if (objIndex !== -1) {
                storage[objIndex].quantity = inputQuantity[i].value
            }
            localStorage.setItem("products",JSON.stringify(storage));
            location.reload()
        })
    })
}
// Fonction suppression du produit dans le panier
function removeElementEvent() {
    let deleteBtn = document.querySelectorAll(".deleteItem");
    let storage = JSON.parse(localStorage.getItem("products"));
    deleteBtn.forEach((element, i) => {
        deleteBtn[i].addEventListener("click", () => {
            let idRemove = storage[i].id
            let colorDelete = storage[i].color
            let updateRemoveStorage = storage.filter((product => product.id !== idRemove || product.color !== colorDelete))
            localStorage.setItem("products", JSON.stringify(updateRemoveStorage)); 
            location.reload()
        })
    })
}
// Calcul et affichage des quantités
function totalQuantity() {
    let totalQuantity = document.getElementById("totalQuantity");
    let quantityProduct = document.querySelectorAll(".itemQuantity");
    let totalNumber = 0;
    quantityProduct.forEach(quantity => {
        totalNumber += parseInt(quantity.value)
    })
    return totalQuantity.innerText = totalNumber
}
// Recup bouton "Commander!" et envoi dans le localStorage des valeurs remplies
function form() {
    let btnCommand = document.getElementById("order");
    btnCommand.addEventListener("click", (e) => {
        e.preventDefault()
        let formValue = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value
        }
        localStorage.setItem("form", JSON.stringify(formValue))
    })
}