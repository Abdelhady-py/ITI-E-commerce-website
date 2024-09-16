const navLogOutBtn = document.getElementById("navLogOutBtn");
const navLoginBtn = document.getElementById("navLoginBtn");
const profile = document.getElementById("profile");
export function checkingUserData() {
  const userInfo = JSON.parse(localStorage.getItem("userData"));

  if (!userInfo) {
    navLoginBtn.classList.remove("d-none");
  } else {
    profile.classList.remove("d-none");
    navLogOutBtn.classList.remove("d-none");
    navLoginBtn.classList.add("d-none");
    profile.children[0].innerHTML = userInfo.username;
  }
}

navLogOutBtn.children[0].addEventListener("click", () => {
  localStorage.removeItem("userData");
  location.assign("index.html");
});
