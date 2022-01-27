// Auto appel de fonctions
(async function() {
  const productId = getProductId()
  const product = await getProduct(productId)
  displayProduct(product)
  addProductEvent(product)
  addTitlePage(product)
})()
// Ajout nom du produit dans le titre de la page
function addTitlePage(product) {
  document.title = product.name
}
//------------------------GESTION DU PRODUIT SUR LE DOM------------------------
// Récup de l'ID du produit du lien du navigateur
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
function displayProduct(product) {
  document.querySelector(".item__img").innerHTML = `<img id="imgTxt" src="${product.imageUrl}" alt="${product.altTxt}"></img>`
  document.getElementById("title").textContent = product.name
  document.getElementById("price").textContent = product.price
  document.getElementById("description").textContent = product.description
  product.colors.forEach((color) =>{
    document.getElementById("colors").innerHTML += `<option value="${color}">${color}</option>`
  })
}
//------------------------GESTION AVANT PANIER------------------------
// Ecoute du bouton et recup des éléments du DOM
function addProductEvent(product) {
  document.getElementById("addToCart").addEventListener("click", () => {
    addProduct(product)
  })
}
// condition d'ajout au localstorage
function addProduct(product) {
  const color = document.getElementById("colors").value;
  const quantity = Number(document.getElementById("quantity").value);
  let cart = JSON.parse(localStorage.getItem("products"))
  //Création de l'objet avant envoi au localStorage
  const item = {
    id: product._id,
    name: product.name,
    altTxt: product.altTxt,
    imgSrc: product.imageUrl,
    color,
    quantity,
  };
  //Condition a remplir et ajout localStorage
  if (quantity > 0 && quantity <=100 && color !== "") {    
    // Ajout produit si localStorage existant ou non
    if (cart !== null) {
      const productFund = cart.find(element => element.id === item.id && element.color === item.color)
      // si l'element est trouvé dans le localStorage ou  non
      if (productFund != undefined) {
        productFund.quantity += quantity
      } else {
        cart.push(item)
      }
    } else {
      cart = []
      cart.push(item)
    }
    localStorage.setItem("products", JSON.stringify(cart))
    popupValidate(product.name, quantity)
  }else {
    alert("Veuillez choisir une quantité entre 1 et 100 et une couleur.")
}
// Popup choix après ajout au panier
function popupValidate(name, quantity) {
  if (window.confirm(`${quantity} ${name} ont été ajouté à votre panier.\nCliquez sur OK pour continuer vos achats ou ANNULER pour aller au panier`)) {
    window.location.href = "index.html"
    } else {
    window.location.href = "cart.html"
    }
  }
}