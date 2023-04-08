import { getLocalStorageForBadge } from "./helpers/getLocalStorageForBadge.js";

//get all elements
const noCartDiv = document.getElementById("no-cart");
const cartItemDiv = document.getElementById("cart-item");
const cartItemRow = document.getElementById("cart-item-row");

const localStorageCart = JSON.parse(localStorage.getItem("myCart")); // converting the JSON to Object

//checking the local Storage
//add to cart

if (!localStorageCart || localStorageCart.length < 1) {
  noCartDiv.classList.add("d-block");
  cartItemDiv.classList.add("d-none");
} else {
  noCartDiv.classList.add("d-none");
  cartItemDiv.classList.add("d-block");
  appendCartItems(localStorageCart);
}

//append Cart Item
function appendCartItems(cartItems) {
  cartItems.forEach((item, i) => {
    const cardDivLeft = document.createElement("div");
    cardDivLeft.classList.add("col-12", "col-sm-6");
    const cardDivReight = document.createElement("div");
    cardDivReight.classList.add("col-12", "col-sm-6");

    cardDivLeft.innerHTML += `

    <div class="image-product d-flex align-items-center justify-content-center justify-content-sm-start">

    <img src="${item.image}" alt="${item.title}" class="w-50 object-fit-cover">
</div>
    `;

    cardDivReight.innerHTML += `
    <div class="card-body mt-5">
    <h5 class="card-title fs-4 fw-bold">${item.title}</h5>
    <p class="card-text mt-2">${item.description}</p>
    <p class="card-text"><small class="text-body-secondary">Price : EGP ${item.price}</small></p>
    <div class="d-flex align-items-center">

        <button class="btn bg-dark text-white m-3" data-in="${item.id}" > +</button>
        <span class="bg-dark text-white p-1 rounded" data-qty="${item.id}" id="qty">QTY: ${item.qty}</span>
        <button class="btn bg-dark text-white m-3" data-out="${item.id}">-</button>
    </div>
  </div>
  `;
    cartItemRow.appendChild(cardDivLeft);
    cartItemRow.appendChild(cardDivReight);
  });
}

//get QTY DOM
let QTY = document.getElementById("qty");

//Incress ITEM CART
document.body.addEventListener("click", (e) => {
  const id = e.target.dataset.in;
  if (e.target.tagName === "BUTTON" && id) {
    const myCartLocal = JSON.parse(localStorage.getItem("myCart"));

    //findItemByID

    const findItem = myCartLocal.findIndex((el) => el.id === parseInt(id));

    myCartLocal[findItem].qty++;

    localStorage.setItem("myCart", JSON.stringify(myCartLocal));

    //getting the target span qty element
    if (id === e.target.nextElementSibling.dataset.qty) {
      e.target.nextElementSibling.innerHTML = `QTY: ${myCartLocal[findItem].qty}`;
    }

    totalAmount();
  }
});

//Decresss Item From List
document.body.addEventListener("click", (e) => {
  e.stopPropagation();
  const id = e.target.dataset.out;
  if (e.target.tagName === "BUTTON" && id) {
    const myCartLocal = JSON.parse(localStorage.getItem("myCart"));

    //findItemByID

    const findItem = myCartLocal.findIndex((el) => el.id === parseInt(id));

    myCartLocal[findItem].qty--;

    localStorage.setItem("myCart", JSON.stringify(myCartLocal));

    //getting the target span qty element
    if (id === e.target.previousElementSibling.dataset.qty) {
      e.target.previousElementSibling.innerHTML = `QTY: ${myCartLocal[findItem].qty}`;
    }

    if (myCartLocal[findItem].qty < 1) {
      myCartLocal.splice(myCartLocal[findItem], 1);
      localStorage.setItem("myCart", JSON.stringify(myCartLocal));
      const reightDiv = e.target.parentNode.parentNode.parentNode;
      const leftDiv =
        e.target.parentNode.parentNode.parentNode.previousElementSibling;
      reightDiv.remove();
      leftDiv.remove();
    }

    // checking if the cart length is less than 1 to update the ui
    if (myCartLocal.length < 1) {
      localStorage.removeItem("myCart");

      window.location.replace("products.html");
    }

    totalAmount();
  }
});

//get total amount
function totalAmount() {
  const totalDiv = document.getElementById("total");

  const getLoclMyCart = JSON.parse(localStorage.getItem("myCart"));

  if (getLoclMyCart) {
    const getTotal = getLoclMyCart.reduce((acc, prev) => {
      acc += prev.price * prev.qty;
      return acc;
    }, 0);

    totalDiv.innerHTML = getTotal;
  }
}

totalAmount();
getLocalStorageForBadge();
