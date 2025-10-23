//table of contacts
function getAllContacts() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const peopleArr = JSON.parse(localStorage.getItem("users"));
  for (let i = 0; i < peopleArr.length; i++) {
    if (peopleArr[i].username === currentUser.username) {
      return peopleArr[i].contacts;
    }
  }
}

//login
function checkUser(user) {
  const users = JSON.parse(localStorage.getItem("users") || []);

  const foundUser = users.find(
    (u) => u.username === user.username && u.password === user.password
  );

  if (foundUser) {
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    return true;
  }
  return false;
}

//register
function addUser(user) {
  const users = JSON.parse(localStorage.getItem("users") || []);

  if (users.some((u) => u.username === user.username)) {
    return false;
  }
  let idNumber = users.length;
  const newUser = {
    username: user.username,
    password: user.password,
    contacts: [],
    id: idNumber,
  };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  idNumber++;
  return true;
}

function addNewContact(contactObj) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const users = JSON.parse(localStorage.getItem("users"));

  const userIndex = users.findIndex((u) => u.username === currentUser.username);

  let idIndx = users[userIndex].contacts.length;
  contactObj.id = idIndx++;
  users[userIndex].contacts.push(contactObj);
  localStorage.setItem("users", JSON.stringify(users));
}

function deleteContactByIdForCurrentUser(contactId) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const userIndex = users.findIndex((u) => u.username === currentUser.username);

  const contactIndex = users[userIndex].contacts.findIndex(
    (c) => c.id === contactId
  );
  if (contactIndex === -1) {
    return false;
  }

  users[userIndex].contacts.splice(contactIndex, 1);

  localStorage.setItem("users", JSON.stringify(users));

  currentUser.contacts = users[userIndex].contacts;
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  return true;
}
