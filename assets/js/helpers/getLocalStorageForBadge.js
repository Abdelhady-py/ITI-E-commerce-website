//Get All DOM Selector
const badge = document.getElementById("badge");
export function getLocalStorageForBadge() {
  //chekcing the localstorage for items
  const cartItems = JSON.parse(localStorage.getItem("myCart"));
  if (cartItems) {
    badge.innerHTML = cartItems.length;
    badge.style.display = "inline";
  }
}
