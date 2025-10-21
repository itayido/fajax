class Fajax {
  constructor() {
    this.method = "";
    this.payload = "";
    this.url = "";
    this.onload = "";
  }
  open(method, url) {
    this.method = method;
    this.url = url;
  }
  send(payload) {
    this.payload = payload;
    return action(this.method, this.url, payload);
  }
}
