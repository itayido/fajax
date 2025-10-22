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

    if (url === "/contacts") {
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
    if (payload && Object.keys(payload).length > 0) {
      if (url === "/contacts") {
        return { value: addNewContact(payload), status: 200 };
      } else if (url === "/login") {
        const isValid = checkUser(payload);
        return {
          value: isValid,
          status: isValid ? 200 : 401,
        };
      } else if (url === "/register") {
        const isExist = addUser(payload);
        return {
          value: isExist,
          status: isExist ? 200 : 422,
        };
      }
    }
  } else {
    return {
      value: "POST request received but payload is empty",
      status: 204,
    };
  }
  //   //DELETE
  //   if (method === "DELETE") {
  //     const idMatch = url.match(/\/(\d+)$/);
  //     if (idMatch) {
  //       const id = Number(idMatch[1]);

  //       if (id) {
  //         const deleted = deleteContact(id);
  //         if (deleted) {
  //           return { value: `Contact with id ${id} deleted`, status: 200 };
  //         } else {
  //           return { value: `Contact with id ${id} not found`, status: 404 };
  //         }
  //       } else {
  //         return { value: "No ID provided in URL for DELETE", status: 400 };
  //       }
  //     }
  //   }
}
