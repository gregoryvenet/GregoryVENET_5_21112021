// Auto appel des fonctions
(async function() {
    const product = await getProducts()
    displayCart()
    updateQuantityEvent()
    removeElementEvent()
    totalQuantity()
    price(product)
    totalPrice()
    SaveForm()
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
        const displayProduct = document.getElementById("cart__items")
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
                    <p id="priceProduct"></p>
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
// Ajout Prix de l'API avec calcul individuel par quantité
function price(product) {
    const priceProduct = document.querySelectorAll("#priceProduct");
    const inputQuantity = document.querySelectorAll(".itemQuantity");
    priceProduct.forEach((item, i)  => {
        const id = item.closest(".cart__item").dataset.id
        const find = product.find(element => element._id == id)
        item.innerText = (find.price * inputQuantity[i].value)+ " €"
    })
}
// changement des quantités avec update du localStorage
function updateQuantityEvent() {
    const inputQuantity = document.querySelectorAll(".itemQuantity");
    const storage = JSON.parse(localStorage.getItem("products"));
        storage.forEach((product, i) => {
        inputQuantity[i].addEventListener("change",() => {
            const objIndex = storage.findIndex(item=> item.id === product.id && item.color === product.color)
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
    const deleteBtn = document.querySelectorAll(".deleteItem");
    const storage = JSON.parse(localStorage.getItem("products"));
    deleteBtn.forEach((element, i) => {
        deleteBtn[i].addEventListener("click", () => {
            if (window.confirm("Voulez-vous vraiment supprimer le produit sélectionné?")) {
                const idRemove = storage[i].id
                const colorDelete = storage[i].color
                const updateRemoveStorage = storage.filter((product => product.id !== idRemove || product.color !== colorDelete))
                localStorage.setItem("products", JSON.stringify(updateRemoveStorage)); 
                location.reload()
            }
        })
    })
    if (deleteBtn.length == 0 ) {
        localStorage.removeItem("products")
        location.reload()
    }
}
// Calcul et affichage des quantités
function totalQuantity() {
    const totalQuantity = document.getElementById("totalQuantity")
    const quantityProduct = document.querySelectorAll(".itemQuantity")
    let totalNumber = 0;
    quantityProduct.forEach(quantity => {
        totalNumber += parseInt(quantity.value)
    })
    return totalQuantity.innerText = totalNumber
}
// Calcul du prix total
function totalPrice() {
    const getTotalPrice = document.getElementById("totalPrice")
    const priceProduct = document.querySelectorAll("#priceProduct")
    let totalNumber = 0
    priceProduct.forEach(element => {
        const totalPrice = element.textContent
        totalNumber += parseInt(totalPrice)
        getTotalPrice.innerText = totalNumber
    });
}
// Recup bouton "Commander!" et envoi dans le localStorage des valeurs remplies du formulaire
function SaveForm() {
    const btnCommand = document.getElementById("order");
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
// Gestion validation du formulaire
function validateForm() {
    // recup messages erreur
    const firstNameErrorMsg = document.getProductId("firstNameErrorMsg")
    const lastNameErrorMsg = document.getProductId("lastNameErrorMsg")
    const addressErrorMsg = document.getProductId("addressErrorMsg")
    const cityErrorMsg = document.getProductId("cityErrorMsg")
    const emailErrorMsg = document.getProductId("emailErrorMsg")
    // regex
    const regexFirstNameErrorMsg = new RegExp(/^[a-zA-Z\s'.-]+$/)
    const regexaddressErrorMsg = new RegExp(/^[A-Za-z0-9'\.\-\s\,]+$/)
    const regexEmailErrorMsg = new RegExp(
        /^((\w[^\W]+)[\.\-]?){1,}\@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
}