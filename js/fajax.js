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
    const obj = action(this.method, this.url, payload);
    if (obj.status === 200) {
      this.status = 200;
      this.responseText = obj.value;
      this.onload();
    }
  }
}
