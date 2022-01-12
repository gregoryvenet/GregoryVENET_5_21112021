// Auto appel de fonctions
(async function() {
    let productId = getProductId()
    let product = await getProduct(productId)
    let colors = product.colors
    productDisplay(product)
    colorsDisplay(colors)
    marketDisplay()
})()
//------------------------GESTION DU PRODUIT------------------------
// Récup de l'ID du produit
function getProductId() {
    return new URL(location.href).searchParams.get("id")
}
// recup des produits avec l'API
function getProduct(productId) {
    return fetch("http://localhost:3000/api/products/" + productId) 
        .then(res => res.json())
        .catch(error => alert("Problème de chargement des produits.\n Veuillez nous excuser du désagrément.\n Nous mettons tout en oeuvre pour régler le problème."))
}
// Affichage des éléments sur le DOM
function productDisplay(product) {
    document.querySelector(".item__img").innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}"></img>`
    document.getElementById("title").textContent = product.name
    document.getElementById("price").textContent = product.price
    document.getElementById("description").textContent = product.description
}
// Affichage des différentes couleurs selon quantité dans l'API
function colorsDisplay(colors) {
    colors.forEach(color => {
    document.getElementById("colors").innerHTML += `<option value="${color}">${color}</option>`
    });
}
//------------------------GESTION AVANT PANIER------------------------

function marketDisplay() {
  // Ecoute du bouton et recup des éléments du DOM et id de l'url
  document.getElementById("addToCart").addEventListener("click", (e) => {
    let selColor = document.getElementById("colors").value;
    let selQuantity = document.getElementById("quantity").value;
    let selName = document.getElementById("title").textContent;
    let SelPrice = document.getElementById("price").textContent;
    let selId = getProductId();
    //Récup valeurs formulaire
    let elProduct = {
      Id: selId,
      name: selName,
      color: selColor,
      quantity: selQuantity,
      price: SelPrice
    };
    //Condition a remplir et envoi au localStorage
    if (elProduct.quantity > 0 && elProduct.quantity <=100 && elProduct.color !== "") {
      // Si ok si dessus alors gestion LocalStorage;
      let prodInLocStorage = JSON.parse(localStorage.getItem("product"))
      // Ajout produit si existant dans le localStorage ou non
      if(prodInLocStorage) {
        if(prodInLocStorage.id === elProduct._id && prodInLocStorage.color === elProduct.color) {
          prodInLocStorage(elProduct.name)++
        } else {
          prodInLocStorage.push(elProduct)
          localStorage.setItem("product", JSON.stringify(prodInLocStorage))
          popupValidate()
      }
      // Ajout produit si inexistant dans le localStorage
      } else {
        prodInLocStorage = []
        prodInLocStorage.push(elProduct)
        localStorage.setItem("product", JSON.stringify(prodInLocStorage))
        popupValidate()
      }
    } else {
      alert("Merci de choisir une quantité compris entre 1 et 100 ainsi qu'une couleur s'il vous plait!");
    }
    // Popup validation ajout au panier
    function popupValidate() {
      if (window.confirm(`${selQuantity} ${selName} ont été ajouté à votre panier.\nCliquez sur OK pour continuer vos achats ou ANNULER pour aller au panier`)) {
        window.location.href = "index.html"
        } else {
        window.location.href = "cart.html"
        }
      }
  });
}
