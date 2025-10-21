const app = document.getElementById("app");

// Handle navigation when URL hash changes or on page load
window.addEventListener("hashchange", router);
window.addEventListener("load", router);

//decides which page to show
function router() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const hash = location.hash.replace("#", "") || "login";

  if (hash === "game" && !currentUser) {
    location.hash = "login";
    return;
  }

  switch (hash) {
    case "login":
      loadLogin();
      break;
    case "register":
      loadRegister();
      break;
    case "game":
      loadGame();
      break;
    default:
      loadLogin();
  }
}

function loadTemplate(id) {
  const template = document.getElementById(id);
  app.innerHTML = "";
  app.appendChild(template.content.cloneNode(true));
}

//login
function loadLogin() {
  loadTemplate("login-template");

  document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      location.hash = "game";
    } else {
      alert("Wrong username or password");
    }
  });
}

//register
function loadRegister() {
  loadTemplate("register-template");

  document.getElementById("register-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value;

    if (!/^[a-zA-Z0-9]{3,}$/.test(username)) {
      alert("Username must contain atleast 3 characters or numbers");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((u) => u.username === username)) {
      alert("Username already exists");
      return;
    }

    const newUser = { username, password, score: 0 };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered successfully");
    location.hash = "login";
  });
}

//game
function loadGame() {
  loadTemplate("game-template");

  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let users = JSON.parse(localStorage.getItem("users")) || [];

  const welcome = document.getElementById("welcome");
  const scoreDisplay = document.getElementById("score-display");

  welcome.textContent = `Welcome, ${currentUser.username}!`;
  scoreDisplay.textContent = `Your score: ${currentUser.score}`;

  document.getElementById("add-score").addEventListener("click", () => {
    currentUser.score += 10;
    scoreDisplay.textContent = `Your score: ${currentUser.score}`;

    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    const index = users.findIndex((u) => u.username === currentUser.username);
    if (index !== -1) {
      users[index] = currentUser;
      localStorage.setItem("users", JSON.stringify(users));
    }
  });

  //logout
  document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    location.hash = "login";
  });
}
