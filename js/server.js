function action(method, url, payload) {
  switch (method) {
    case "GET":
      if (!url || typeof url !== "string") {
        return {
          value: "Invalid URL",
          status: 500,
        };
      }

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
}
