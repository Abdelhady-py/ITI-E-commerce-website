import { checkingUserData } from "./helpers/checkUserData.js";
import { getLocalStorageForBadge } from "./helpers/getLocalStorageForBadge.js";
const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === "") {
    return alertify.alert("This email is not valid");
  }

  if (password === "") {
    return alertify.alert("This email is not valid");
  }

  //get registration DB

  const registrationDB = JSON.parse(localStorage.getItem("registrationDB"));

  if (!registrationDB) {
    alert("please Registration First");
    window.location.replace("register.html");
  }

  const findEmailIndex = registrationDB.findIndex((el) => {
    return el.email === email;
  });

  if (findEmailIndex === -1) {
    alert("please Registration First");
    return window.location.replace("register.html");
  }

  if (
    registrationDB[findEmailIndex].email === email &&
    registrationDB[findEmailIndex].password === password
  ) {
    const userData = {
      email,
      password,
      username: registrationDB[findEmailIndex].username,
      address: registrationDB[findEmailIndex].address,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
    window.location.replace("index.html");
  } else {
    alert("email or password is invalid");
  }
});
getLocalStorageForBadge();
checkingUserData();
