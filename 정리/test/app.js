const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html", "Set-Cookie": "fruit=apple" });
  console.log(req.headers);
  res.write(`${req.headers.cookie}`);
  res.end("success");
});
server.listen("8080", () => { console.log("8080 start");});