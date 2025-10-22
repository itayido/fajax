class Fajax {
  constructor() {
    this.method = "";
    this.payload = "";
    this.url = "";
    this.onload = function () {};
    this.responseText = "";
    this.status = "";
  }
  open(method, url) {
    this.method = method;
    this.url = url;
  }
  send(payload) {
    this.payload = payload;
    const method = this.method;
    const url = this.url;
    const obj = networkRequest(method, url, payload);

    this.status = obj.status;
    this.responseText = obj.value;
    this.onload();
  }
}
