// Auto appel de fonction avec boucle
(async function () {
	const products = await getProducts();
	products.forEach((product) => {
		displayProduct(product);
	});
})();
// recup des produits avec l'API
function getProducts() {
	return fetch("http://localhost:3000/api/products")
		.then((res) => res.json())
		.catch((err) =>
			alert(
				"Problème de chargement des produits.\nVeuillez nous excuser du désagrément\nNous mettons tout en oeuvre pour régler le problème.\n" +
					err.message,
			),
		);
}
// Affichage des produits sur le DOM
function displayProduct(product) {
	document.getElementById("items").innerHTML += `
    <a href="./product.html?id=${product._id}">
        <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
        </article>
    </a>`;
}
