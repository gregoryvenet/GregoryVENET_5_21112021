// Auto appel de fonction avec boucle
(async function() {
    const products = await getProducts()
    for (product of products) {
        productsDisplay(products)
    }
})()
// recup des produits avec l'API
function getProducts() {
    return fetch("http://localhost:3000/api/products") 
        .then(response => response.json())
        .then(products => products)
        .catch(error => alert("Problème de chargement des produits.\n Veuillez nous excuser du désagrément.\n Nous mettons tout en oeuvre pour régler le problème."))
}
// Affichage des produits sur le DOM
function productsDisplay(products) {
    document.getElementById("items").innerHTML += `
    <a href="./product.html?id=${product._id}">
        <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
        </article>
    </a>`
}
