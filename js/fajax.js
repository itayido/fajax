class Fajax {
  constructor(method, url) {
    this.method = method;
    this.url = url;
  }
  send() {
    action(this.method);
  }
}
