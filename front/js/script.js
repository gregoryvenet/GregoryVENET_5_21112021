//--------------Importation et affichage des articles sur l'index.html----------------//
const importApi = document.getElementById("items");
let articles;
// Requete Get pour la recup des produits depuis l'API
const fetchArticles = async() => {
    articles = await fetch("http://localhost:3000/api/products")
        .then(response => response.json())
        .catch(error => console.log("Problème avec le fetch de l'API: " + error.message));
};

// Fonction affichage du retour de l'API
const returnArticles = async() => {
    await fetchArticles();
    importApi.innerHTML = (
        articles.map(article => (
            `<a href='./product.html?id=${article._id}'>
                <article>
                    <img src='${article.imageUrl}' alt='${article.altTxt}'>
                    <h3 class='productName'>${article.name}</h3>
                    <p class='productDescription'>${article.description}</p>
                </article>
            </a>`
        )).join("")
    );
}

// Appel fonction
returnArticles();