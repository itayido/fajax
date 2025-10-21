function getAll() {
  const currentUser = localStorage.getItem("currentUser");
  const peopleArr = localStorage.getItem("currentUser");
  for (let i = 0; i < peopleArr.length; i++) {
    if (peopleArr[i].username === currentUser) {
      return peopleArr[i].contacts;
    }
  }
  return JSON.parse(localStorage.getItem(changing));
}
console.log(getAll("peopleArr"));
console.log(getAll("filmsArr"));

//get person by id
function getPersonById(id) {
  peopleArr = getAll("peopleArr");
  for (let i = 0; i < peopleArr.length; i++) {
    if (peopleArr[i].id === id) {
      return peopleArr[i];
    }
  }
  return "Person Not Found";
}
console.log(getPersonById(2));

//get movie by id
function getMovieById(id) {
  filmsArr = getAll("filmsArr");
  for (let i = 0; i < filmsArr.length; i++) {
    if (filmsArr[i].id === id) {
      return filmsArr[i];
    }
  }
  return "Movie Not Found";
}
console.log(getMovieById(2));

//returns an array of people with eye color or hair color that matches the request
function eyeOrHaircolor(colorType, color) {
  peopleArr = getAll("peopleArr");
  resultArr = [];
  for (let i = 0; i < peopleArr.length; i++) {
    if (peopleArr[i][colorType] === color) {
      resultArr.push(peopleArr[i]);
    }
  }
  if (resultArr) {
    return resultArr;
  }
  return "No Results";
}
console.log(eyeOrHaircolor("hair_color", "blond"));

//add new person
function addNewPerson(name, height, eyeColor, hairColor) {
  peopleArr = getAll("peopleArr");
  const newPerson = {
    name: name,
    height: height,
    eye_color: eyeColor,
    hair_color: hairColor,
    id: peopleArr.length + 1,
  };
  peopleArr.push(newPerson);
  localStorage.setItem("peopleArr", JSON.stringify(peopleArr));
}
//addNewPerson("hi", "172", "blue", "black");
//addNewPerson("bye", "172", "green", "blonde");
//console.log(getAll("peopleArr"));

//deletes a person
function deletePerson(id) {
  peopleArr = getAll("peopleArr");
  for (let i = 0; i < peopleArr.length; i++) {
    if (peopleArr[i].id === id) {
      peopleArr.splice(i, 1);
      localStorage.setItem("peopleArr", JSON.stringify(peopleArr));
      return;
    }
  }
  return "Not Found";
}
console.log(deletePerson(5));

//deletes a movie from a person
function deletesMovieFromList(id, link) {
  peopleArr = getAll("peopleArr");
  for (let i = 0; i < peopleArr.length; i++) {
    if (peopleArr[i].id === id) {
      for (let j = 0; j < peopleArr[i].films.length; j++) {
        if (peopleArr[i].films[j] === link) {
          peopleArr[i].films.splice(j, 1);
          localStorage.setItem("peopleArr", JSON.stringify(peopleArr));
          return;
        }
      }
      return "movie link not found";
    }
  }
}
console.log(deletesMovieFromList(10, "https://swapi.py4e.com/api/films/3/"));