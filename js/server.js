function action(method, url) {
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
      return getAllContacts();
  }
}
