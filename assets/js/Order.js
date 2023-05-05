import { checkingUserData } from "./helpers/checkUserData.js";

let noCartDiv = document.getElementById("no-cart");
let cartItemDiv = document.getElementById("cart-item");
let orderItems = document.getElementById("order-item"); 

//getting the Order From LocalStorage
const getLoclMyOrder = JSON.parse(localStorage.getItem("myOrders"));

if (!getLoclMyOrder || getLoclMyOrder.length < 1) {
  noCartDiv.classList.add("d-block");
  cartItemDiv.classList.add("d-none");
} else {
  noCartDiv.classList.add("d-none");
  cartItemDiv.classList.add("d-block");
  appendOrderItems(getLoclMyOrder);
}

//Routing Gard
const userData = JSON.parse(localStorage.getItem("userData"));
if (!userData) {
  window.location.replace("index.html");
}

function appendOrderItems(cardOrderItems) {
  cardOrderItems.forEach((item, i) => {
    const orderDivinfo = document.createElement("div");
    orderDivinfo.classList.add(
      "col-sm-12",
      "col-lg-4",
      "d-flex",
      "justify-content-center",
      "mb-3"
    );

    orderDivinfo.innerHTML += `
        <div class="card border-dark" style="width: 19rem;">
          <img src="${item.image}" class="card-img-top h-50" alt="${
      item.image
    }">
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Price: ${item.price} &dollar;</li>
            <li class="list-group-item">QTY: ${item.qty} </li>
            <li class="list-group-item fw-bold">Total-Order-price: ${
              item.qty * item.price
            }&dollar;</li>
          </ul>

        </div>
    `;
    orderItems.appendChild(orderDivinfo);
  });
}

// get total order
const totalOrdercount = document.getElementById("Total");
totalOrdercount.innerHTML = getLoclMyOrder ? getLoclMyOrder.length : "0";

//get total price
function totalAmount() {
  const totalDiv = document.getElementById("tPrice");

  const getLoclMyCart = JSON.parse(localStorage.getItem("myOrders"));

  if (getLoclMyCart) {
    const getTotal = getLoclMyCart.reduce((acc, prev) => {
      acc += prev.price * prev.qty;
      return acc;
    }, 0);

    totalDiv.innerHTML = getTotal;
  }


}
totalAmount();

checkingUserData();
