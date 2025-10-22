function action(method, url, payload) {
  if (!url || typeof url !== "string") {
    return {
      value: "Invalid URL",
      status: 500,
    };
  }
  if (method === "GET") {
    const idMatch = url.match(/\/(\d+)$/);
    if (idMatch) {
      const id = Number(idMatch[1]);
      return {
        value: getSpecificContact(id),
        status: 200,
      };
    }

    if (url.endsWith("contacts")) {
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
  if (method === "POST") {
    if (payload && Object.keys(payload).length > 0) {
      return { value: addNewContact(payload), status: 200 };
    } else {
      return {
        value: "POST request received but payload is empty",
        status: 500,
      };
    }
  }
}
