const app = document.getElementById("app");

// Handle navigation when URL hash changes or on page load
window.addEventListener("hashchange", router);
window.addEventListener("load", router);

//decides which page to show
function router() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const hash = location.hash.replace("#", "") || "login";

  if (hash === "application" && !currentUser) {
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
    case "application":
      loadApplication();
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

    const fajax = new Fajax();
    fajax.open("POST", "/login");
    fajax.onload = function () {
      if (this.status === 200) {
        location.hash = "application";
      } else {
        alert("User not found or bad credentials");
      }
    };

    fajax.send({ username: username, password: password });
  });
}

//register
function loadRegister() {
  loadTemplate("register-template");

  document.getElementById("register-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value;
    const confirmPassword = document.getElementById(
      "reg-confirmPassword"
    ).value;

    if (password !== confirmPassword) {
      alert("password and confirm password aren't identical");
      return;
    }
    if (!/^[a-zA-Z0-9]{3,}$/.test(username)) {
      alert("Username must contain atleast 3 characters or numbers");
      return;
    }

    if (!/^[a-zA-Z0-9]{3,}$/.test(password)) {
      alert("Username must contain atleast 3 characters or numbers");
      return;
    }

    const fajax = new Fajax();
    fajax.open("POST", "/register");
    fajax.onload = function () {
      if (this.status === 200) {
        location.hash = "login";
      } else {
        alert("Username already taken");
      }
    };

    fajax.send({ username: username, password: password });
  });
}

//application
function loadApplication() {
  loadTemplate("application");

  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const welcome = document.getElementById("welcome");

  welcome.textContent = `Welcome, ${currentUser.username}!`;

  //creation of the contacts table
  document.getElementById("getContacts").addEventListener("click", getContacts);

  function getContacts() {
    document
      .getElementById("getContacts")
      .removeEventListener("click", getContacts);
    const fajax = new Fajax();
    fajax.open("GET", "/contacts");
    fajax.onload = function () {
      if (this.status === 200) {
        const contacts = this.responseText;
        for (let i = 0; i < contacts.length; i++) {
          printsAContactToTheTable(contacts[i]);
        }
      } else {
        alert("an error occured");
      }
    };

    fajax.send();
  }

  function printsAContactToTheTable(obj) {
    const tableBody = document.getElementById("contactsBody");

    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = obj.name;

    const phoneCell = document.createElement("td");
    phoneCell.textContent = obj.phoneNumber;

    const emailCell = document.createElement("td");
    emailCell.textContent = obj.email;

    row.appendChild(nameCell);
    row.appendChild(phoneCell);
    row.appendChild(emailCell);

    tableBody.appendChild(row);
  }
  // add new contact
  document.getElementById("addContact").addEventListener("click", () => {
    const fajax = new Fajax();
    fajax.open("POST", "/contacts");
    const name = document.getElementById("contactName").value;
    const phoneNumber = document.getElementById("contactPhone").value;
    const email = document.getElementById("contactEmail").value;
    const contactObj = {
      name,
      phoneNumber,
      email,
    };
    fajax.onload = function () {
      if (this.status === 200) {
        alert("Contact added successfully");
        document.getElementById("contactForm").reset();
        printsAContactToTheTable(contactObj);
      } else {
        alert("Something went wrong");
      }
    };
    fajax.send(contactObj);
  });

  //logout
  document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    location.hash = "login";
  });
}
