function getAllContacts() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const peopleArr = JSON.parse(localStorage.getItem("users"));
  for (let i = 0; i < peopleArr.length; i++) {
    if (peopleArr[i].username === currentUser.username) {
      return peopleArr[i].contacts;
    }
  }
  return "contacts not found";
}

function getSpecificContact(id) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const peopleArr = JSON.parse(localStorage.getItem("users"));
  for (let j = 0; j < peopleArr.length; j++) {
    if (peopleArr[j].username === currentUser.username) {
      return peopleArr[j].contacts;
    }
  }
}

function addNewContact(name, phoneNumber, email) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const users = JSON.parse(localStorage.getItem("users"));

  const userIndex = users.findIndex((u) => u.username === currentUser.username);
  if (userIndex === -1) {
    console.error("Current user not found in users array");
    return;
  }

  const newContact = {
    name,
    phoneNumber,
    email,
  };
  users[userIndex].contacts.push(newContact);
  localStorage.setItem("users", JSON.stringify(users));
  console.log("Contact added successfully");
}

// //deletes a person
// function deletePerson(id) {
//   peopleArr = getAll("peopleArr");
//   for (let i = 0; i < peopleArr.length; i++) {
//     if (peopleArr[i].id === id) {
//       peopleArr.splice(i, 1);
//       localStorage.setItem("peopleArr", JSON.stringify(peopleArr));
//       return;
//     }
//   }
//   return "Not Found";
// }
// console.log(deletePerson(5));
