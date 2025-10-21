function action(method, url) {
  switch (method) {
    case "GET":
      if (!url || typeof url !== "string") {
        console.error("Invalid URL");
        return;
      }
      if (typeof url.charAt(url.length - 1)) {
        //the url end with a number
        getSpecificContact();
      }
      getAllContacts();
      break;
  }
}
