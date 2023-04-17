import { checkingUserData } from "./helpers/checkUserData.js";
import { getLocalStorageForBadge } from "./helpers/getLocalStorageForBadge.js";

let userData = JSON.parse(localStorage.getItem("userData"));

if (!userData) {
  window.location.replace("index.html");
}

document.getElementById("inputUserName").value = userData.username;
document.getElementById("inputEmail4").value = userData.email;
document.getElementById("inputPassword4").value = userData.password;
document.getElementById("inputAddress").value = userData.address;
document.getElementById("inputCity").value = userData.address;

getLocalStorageForBadge();

checkingUserData();

const formFields = document.querySelectorAll(".form-control");
const editFormLink = document.getElementById("editFormLink");
const saveChangesBtn = document.getElementById("saveChangesBtn");

saveChangesBtn.style.display = "none";

formFields.forEach((field) => {
  field.readOnly = true;
});

editFormLink.addEventListener("click", () => {
  formFields.forEach((field) => {
    field.readOnly = !field.readOnly;
  });
  saveChangesBtn.style.display = "block";
});

saveChangesBtn.addEventListener("click", () => {
  const updatedUserData = {
    ...userData,
    username: document.getElementById("inputUserName").value,
    email: document.getElementById("inputEmail4").value,
    password: document.getElementById("inputPassword4").value,
    address: document.getElementById("inputAddress").value,
  };
  localStorage.setItem("userData", JSON.stringify(updatedUserData));
  alert("Changes saved successfully!");
  window.location.reload();
});
