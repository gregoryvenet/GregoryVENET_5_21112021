// GESTION DU PRODUIT

// Auto appel des fonctions
(async function() {
    let productId = getProductId()
    let product = await getProduct(productId)
    let colors = product.colors
    productDisplay(product)
    colorsDiplay(colors)
})()
// Récup de l'ID du produit
function getProductId() {
    return new URL(location.href).searchParams.get("id")
}
// recup des produits avec l'API
function getProduct(productId) {
    return fetch("http://localhost:3000/api/products/" + productId) 
        .then(response => response.json())
        .then(products => products)
        .catch(error => alert("Problème de chargement des produits.\n Veuillez nous excuser du désagrément.\n Nous mettons tout en oeuvre pour régler le problème."))
}
// Affichage des éléments sur le DOM
function productDisplay(product) {
    document.querySelector(".item__img").innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}"></img>`
    document.getElementById("title").textContent = product.name
    document.getElementById("price").textContent = product.price
    document.getElementById("description").textContent = product.description
}
// Affichage des différentes couleurs
function colorsDiplay(colors) {
    for (color of colors) {
    document.getElementById("colors").innerHTML += `<option value="${color}">${color}</option>`
    }
}

// GESTION DU PANIER
