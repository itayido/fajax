function action(method, url, payload) {
  switch (method) {
    case "GET":
      if (!url || typeof url !== "string") {
        return "Invalid URL";
      }

      const idMatch = url.match(/\/(\d+)$/);
      if (idMatch) {
        const id = Number(idMatch[1]);
        return getSpecificContact(id);
      }

      if (url.endsWith("contacts")) {
        return getAllContacts();
      }
      return "Invalid URL";
  }
}
