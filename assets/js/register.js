import { checkingUserData } from "./helpers/checkUserData.js";
import { getLocalStorageForBadge } from "./helpers/getLocalStorageForBadge.js";
const register_btn = document.getElementById("registerBtn");

register_btn.addEventListener("click", (e) => {
  e.preventDefault();
  //select the value of the input
  const username = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const password = document.getElementById("password").value;

  //validation
  if (username === "" || username.length < 3) {
    return alertify.alert(
      "The inputs must not be empty and not less 3 charachter!"
    );
  }

  if (!email.includes("@") || email === "") {
    return alertify.alert("This email is not valid");
  }

  if (address === "" || password == "") {
    return alertify.alert("The inputs must not be empty!");
  }

  if (!password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[\w!@#$%]{6,}$/)) {
    return alertify.alert(`
        The password has a minimum of 6 characters, 
        at least 1 upper case char, at least 1 lower case char and at least 1 number with no spaces `);
  }

  let userDataRegistration = JSON.parse(localStorage.getItem("registrationDB"));
  if (!userDataRegistration) {
    let userCollection = [];
    userCollection.push({ username, email, address, password });
    localStorage.setItem("registrationDB", JSON.stringify(userCollection));
    location.replace("login.html");
    // return
  }

  let findeEmailIndex = userDataRegistration.findIndex((el) => {
    return el.email === email;
  });

  if (findeEmailIndex === -1) {
    userDataRegistration.push({ username, email, address, password });
    localStorage.setItem(
      "registrationDB",
      JSON.stringify(userDataRegistration)
    );
  } else {
    return alertify.alert("this user is aleardy exsist");
  }

  location.replace("login.html");
});
getLocalStorageForBadge();
checkingUserData();
