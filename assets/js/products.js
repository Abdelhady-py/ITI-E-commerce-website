//imports
import { getAllProducts } from "./helpers/fetchAPI.js";
import { getLocalStorageForBadge } from "./helpers/getLocalStorageForBadge.js";
import { checkingUserData } from "./helpers/checkUserData.js";
//API_URL
const API_URL = "./assets/js/apis";
// Fetching All The Products
const { products } = await getAllProducts(`${API_URL}/products.json`);

//getting all the DOM selector
const productsDiv = document.getElementById("products-div");

function appendProducts() {
  products.forEach((prod) => {
    const productCard = document.createElement("div");
    productCard.classList.add(
      "mt-5",
      "mb-5",
      "col-md-4",
      "col-sm-6",
      "col-lg-3"
    );
    productCard.innerHTML += `
      <div class="card" >
          <div class="card-body">
              <img src="${prod.image}" class="object-fit-cover w-100" alt="${
      prod.title
    }">
              <h6 class="card-subtitle mb-2 mt-2 text-body-secondary">${
                prod.title.substring(0, 30) + "..."
              }</h6>
              <h6 class="card-subtitle mb-2 text-body-secondary fw-bold"> EGP : ${
                prod.price
              }</h6>
              <btn class="btn btn-dark add-to-cart" data-id="${
                prod.id
              }">add To Cart</btn>
          </div>
        </div>

    `;
    productsDiv.appendChild(productCard);
  });
}

productsDiv.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart")) {
    const id = event.target.dataset.id;
    addItemToCart(id);

    window.location.replace("cart.html");
  }
});

function addItemToCart(id) {
  const findProductById = products.find((prod) => prod.id === parseInt(id));

  //checking for localStorage

  const myCart = JSON.parse(localStorage.getItem("myCart"));
  let localCart = [];

  const newItemCart = {
    ...findProductById,
    qty: 1,
  };
  if (!myCart) {
    localCart.push(newItemCart);
    localStorage.setItem("myCart", JSON.stringify(localCart));
  } else {
    /// find cart item and increcss the quantatiy
    const findItemInLocalStorage = myCart.findIndex(
      (prodId) => prodId.id === findProductById.id
    );

    localCart = [...myCart];

    if (findItemInLocalStorage === -1) {
      localCart = [...myCart, newItemCart];
      localStorage.setItem("myCart", JSON.stringify(localCart));
    } else {
      localCart[findItemInLocalStorage].qty++;
      localStorage.setItem("myCart", JSON.stringify(localCart));
    }
  }
}

appendProducts();
getLocalStorageForBadge();
checkingUserData();
