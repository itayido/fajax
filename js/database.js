function getAllContacts() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const peopleArr = JSON.parse(localStorage.getItem("users"));
  for (let i = 0; i < peopleArr.length; i++) {
    if (peopleArr[i].username === currentUser.username) {
      return peopleArr[i].contacts;
    }
  }
}

// function getSpecificContact(id) {
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//   const peopleArr = JSON.parse(localStorage.getItem("users"));
//   for (let j = 0; j < peopleArr.length; j++) {
//     if (peopleArr[j].username === currentUser.username) {
//       return peopleArr[j].contacts;
//     }
//   }
// }

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

function addUser(user) {
  let users = JSON.parse(localStorage.getItem("users") || []);

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
  console.log("Contact added successfully");
}

// function deleteContact(id) {
//   const contactsArr = getAllContacts();
//   if (id > contactsArr.length) {
//     return "Not Found";
//   }
//   contactsArr.splice(id - 1, 1);
//   localStorage.setItem("contactsArr", JSON.stringify(contactsArr));
//   return true;
// }
// console.log(deleteContact(2));
