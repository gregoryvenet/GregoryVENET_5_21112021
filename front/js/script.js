// Importation et affichage des articles
// Requete Get pour la recup des produits depuis l'API

fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((json) => console.log(json));

// Récup 