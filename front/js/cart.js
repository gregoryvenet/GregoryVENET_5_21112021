// Auto appel des fonctions
(async function () {
	const products = await getProducts();
	displayCart();
	updateQuantityEvent();
	removeElementEvent();
	totalQuantity();
	validateForm();
	price(products);
	totalPrice()
})();
// recup des produits avec l'API
function getProducts() {
	return fetch("http://localhost:3000/api/products/")
		.then((res) => res.json())
		.catch((error) =>
			alert(
				"Problème de chargement des produits.\nVeuillez nous excuser du désagrément.\nNous mettons tout en oeuvre pour régler le problème.\n" + error.message,
			),
		);
}
// Récup élements produits du localStorage
function productStorage() {
	return JSON.parse(localStorage.getItem("products"));
}
// Gestion panier
function displayCart() {
	// Action si panier vide ou rempli
	if (productStorage() == null) {
		document.querySelector("h1").innerText = "Votre panier est vide";
		document.querySelector(".cart__price").innerHTML = "";
	} else {
		const displayProduct = document.getElementById("cart__items");
		productStorage().forEach((element) => {
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
            </article>`;
		});
	}
}
// Ajout Prix de l'API avec calcul individuel par quantité
function price(products) {
	const priceProduct = document.querySelectorAll("#priceProduct");
	const inputQuantity = document.querySelectorAll(".itemQuantity");
	priceProduct.forEach((item, i) => {
		const id = item.closest(".cart__item").dataset.id;
		const find = products.find(element => element._id == id);
		item.innerText = find.price * inputQuantity[i].value + " €";
	});
}
// changement des quantités avec update du localStorage
function updateQuantityEvent() {
	const inputQuantity = document.querySelectorAll(".itemQuantity");
	const storage = JSON.parse(localStorage.getItem("products"));
	storage.forEach((product, i) => {
		inputQuantity[i].addEventListener("change", () => {
			if (inputQuantity[i].value > 0 && inputQuantity[i].value <= 100) {
				const prodIndex = storage.findIndex(
					(item) => item.id === product.id && item.color === product.color,
				);
				if (prodIndex !== -1) {
					storage[prodIndex].quantity = Number(inputQuantity[i].value);
				}
			} else {
				alert("Veuillez choisir une quantité entre 1 et 100");
			}
			localStorage.setItem("products", JSON.stringify(storage));
			location.reload();
			validateForm();
		});

	});
}
// Fonction suppression du produit dans le panier
function removeElementEvent() {
	const deleteBtn = document.querySelectorAll(".deleteItem");
	const storage = JSON.parse(localStorage.getItem("products"));
	deleteBtn.forEach((element, i) => {
		deleteBtn[i].addEventListener("click", () => {
			if (
				window.confirm("Voulez-vous vraiment supprimer le produit sélectionné?")
			) {
				const idRemove = storage[i].id;
				const colorDelete = storage[i].color;
				const updateRemoveStorage = storage.filter(
					(product) => product.id !== idRemove || product.color !== colorDelete,
				);
				localStorage.setItem("products", JSON.stringify(updateRemoveStorage));
				location.reload();
			}
		});
	});
	if (deleteBtn.length == 0) {
		localStorage.removeItem("products");
		location.reload();
	}
}
// Calcul et affichage des quantités
function totalQuantity() {
	const totalQuantity = document.getElementById("totalQuantity");
	const quantityProduct = document.querySelectorAll(".itemQuantity");
	let totalNumber = 0;
	quantityProduct.forEach((quantity) => {
		totalNumber += parseInt(quantity.value);
	});
	totalQuantity.innerText = totalNumber;
}
// Calcul du prix total
function totalPrice() {
	const getTotalPrice = document.getElementById("totalPrice");
	const priceProduct = document.querySelectorAll("#priceProduct");
	let totalNumber = 0;
	priceProduct.forEach((element) => {
		const totalPrice = element.textContent;
		totalNumber += parseInt(totalPrice);
		getTotalPrice.innerText = totalNumber;
	});
}
// Recup bouton "Commander!" et envoi dans le localStorage des valeurs remplies du formulaire
function validateForm() {
	// get valeurs input DOM
	const firstName = document.getElementById("firstName");
	const lastName = document.getElementById("lastName");
	const address = document.getElementById("address");
	const city = document.getElementById("city");
	const email = document.getElementById("email");
	// get messages erreur
	const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
	const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
	const addressErrorMsg = document.getElementById("addressErrorMsg");
	const cityErrorMsg = document.getElementById("cityErrorMsg");
	const emailErrorMsg = document.getElementById("emailErrorMsg");
	// création regex
	const regexFirstLastName = /^[A-Za-z\é\è\ê\-]{3,20}$/;
	const regexaddress = /^[A-Za-z0-9\é\è\ê\-\s\ \.\,]{5,100}$/;
	const regexCity = /^[A-Za-z\é\è\ê\ \,\-]{2,20}$/;
	const regexEmail = /^[A-Za-z0-9\-\.\_]+@([A-Za-z]+\.)+[A-Za-z]{2,4}$/;
	// condition validation regex input et affichage erreur
	firstName.addEventListener("input", () => {
		if (regexFirstLastName.test(firstName.value)) {
			firstNameErrorMsg.innerText = "";
		} else {
			firstNameErrorMsg.innerText =
				"Le prénom doit contenir entre 3 et 20 lettres et un tiret au besoin";
		}
	});
	lastName.addEventListener("input", () => {
		if (regexFirstLastName.test(lastName.value)) {
			lastNameErrorMsg.innerText = "";
		} else {
			lastNameErrorMsg.innerText =
				"Le nom doit contenir entre 3 et 20 lettres et un tiret au besoin";
		}
	});
	address.addEventListener("input", () => {
		if (regexaddress.test(address.value)) {
			addressErrorMsg.innerText = "";
		} else {
			addressErrorMsg.innerText =
				"L'adresse doit contenir entre 5 et 100 caractères et ne doit pas avoir de caractères spéciaux";
		}
	});
	city.addEventListener("input", () => {
		if (regexCity.test(city.value)) {
			cityErrorMsg.innerText = "";
		} else {
			cityErrorMsg.innerText =
				"La ville doit contenir entre 2 et 20 lettres uniquement";
		}
	});
	email.addEventListener("input", () => {
		if (regexEmail.test(email.value)) {
			emailErrorMsg.innerText = "";
		} else {
			emailErrorMsg.innerText =
				"Veuillez respecter la convention (Exemple : kanap.kanap@kanap.com)";
		}
	});
	// Gestion envoie commande
	const btnCommand = document.getElementById("order");
	btnCommand.addEventListener("click", (e) => {
		e.preventDefault();
		if (
			regexFirstLastName.test(firstName.value) &&
			regexFirstLastName.test(lastName.value) &&
			regexaddress.test(address.value) &&
			regexCity.test(city.value) &&
			regexEmail.test(email.value)
		) {
			let productOrder = [];
			productStorage().forEach(order => {
				productOrder.push(order.id);

			});
			const order = {
				contact: {
					firstName: firstName.value,
					lastName: lastName.value,
					address: address.value,
					city: city.value,
					email: email.value,
				},
				products: productOrder,
			};
			console.log(order);
			addServer(order);
		} else {
			e.preventDefault();
			alert("Veuillez vérifier le formulaire.");
		}
	});
}
// gestion envoi au backend
function addServer(order) {
	fetch("http://localhost:3000/api/products/order", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(order),
	})
	.then((response) => response.json())
	.then((response) => {
		localStorage.clear();
		window.location.href = "./confirmation.html?orderId=" + response.orderId;
		console.log( response );
	})
	.catch((error) => {
		alert(
			"Problème de chargement des produits.\nVeuillez nous excuser du désagrément.\nNous mettons tout en oeuvre pour régler le problème.\n" +
				error.message,
		);
	});
}
