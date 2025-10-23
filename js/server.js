function action(method, url, payload) {
  if (!url || typeof url !== "string") {
    return {
      value: "Invalid URL",
      status: 500,
    };
  }

  //GET
  if (method === "GET") {
    const idMatch = url.match(/\/(\d+)$/);
    if (idMatch) {
      const id = Number(idMatch[1]);
      return {
        value: getSpecificContact(id),
        status: 200,
      };
    }

    if (url === "users/contacts") {
      return {
        value: getAllContacts(),
        status: 200,
      };
    }
    return {
      value: "Invalid URL",
      status: 500,
    };
  }
  //POST
  if (method === "POST") {
    if (payload && Object.keys(payload).length < 1) {
      return {
        value: "POST request received but payload is empty",
        status: 204,
      };
    } else {
      if (url === "users/contacts") {
        return { value: addNewContact(payload), status: 200 };
      } else if (url === "users/login") {
        const isValid = checkUser(payload);
        return {
          value: isValid,
          status: isValid ? 200 : 401,
        };
      } else if (url === "users/register") {
        const isExist = addUser(payload);
        return {
          value: isExist,
          status: isExist ? 200 : 422,
        };
      }
    }
  }
  //DELETE
  if (method === "DELETE") {
    const idMatchNumber = url.split("/").pop();
    const idMatch = url.match(/users\/contacts\/(\d+)$/);
    if (idMatch) {
      const id = Number(idMatch[1]);
      const deleted = deleteContactByIdForCurrentUser(id);
      return {
        value: deleted,
        status: deleted ? 200 : 401,
      };
    }
    return { value: "No ID provided in URL for DELETE", status: 400 };
  }
}
