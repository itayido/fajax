function networkRequest(method, url, payload) {
  //checks if the server address is correct
  if (!/^users\//.test(url)) {
    return {
      value: "server not found",
      status: 404,
    };
  }

  // setimeout

  //checks if the request took too long
  if (Math.random() < 0.1) return { value: "request timed out", status: 408 };

  return action(method, url, payload);
}
