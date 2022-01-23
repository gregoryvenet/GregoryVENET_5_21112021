// Auto appel de fonctions
(async function() {
    let productId = getProductId()
    let product = await getProduct(productId)
    displayProduct(product)
    addProductEvent(product)
})()
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
function addProductEvent(product) {
  // Ecoute du bouton et recup des éléments du DOM
  document.getElementById("addToCart").addEventListener("click", () => {
    let color = document.getElementById("colors").value;
    let quantity = document.getElementById("quantity").value;
    //Création de l'objet avant envoi au localStorage
    let item = {
      id: product._id,
      name: product.name,
      altTxt: product.altTxt,
      imgSrc: product.imageUrl,
      color,
      quantity,
    };
    //Condition a remplir et ajout localStorage
    if (quantity > 0 && quantity <=100 && color !== "") {
      // Transforme json du LocalStorage en objet;
      let locStorage = JSON.parse(localStorage.getItem("products"))
      // Ajout produit si localStorage existant ou non
      if (locStorage !== null) {
        let findElement = locStorage.find(element => element.id === item.id && element.color === item.color)
        console.table(findElement);
        // si l'element est trouvé dans le localStorage ou  non
        if (findElement != undefined) {
          let elQuantity = parseInt(findElement.quantity)
          let quantity = parseInt(item.quantity)
          findElement.quantity = elQuantity + quantity
          localStorage.setItem("products", JSON.stringify(locStorage))
        } else {
          locStorage.push(item)
          localStorage.setItem("products", JSON.stringify(locStorage))
        }
        // appel fonction popup de validation
        popupValidate()
      } else {
        locStorage = []
        locStorage.push(item)
        localStorage.setItem("products", JSON.stringify(locStorage))
        popupValidate();
      }
    } else {
      alert("Merci de choisir une quantité compris entre 1 et 100 ainsi qu'une couleur s'il vous plait!");
    }
    // Popup choix après ajout au panier
    function popupValidate() {
      if (window.confirm(`${quantity} ${product.name} ont été ajouté à votre panier.\nCliquez sur OK pour continuer vos achats ou ANNULER pour aller au panier`)) {
        window.location.href = "index.html"
        } else {
        window.location.href = "cart.html"
        }
      }
  });
}