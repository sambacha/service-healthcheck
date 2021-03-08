// @file HealthCheck Service
var http = require("http");
var fs = require("fs");
var server = http.createServer(function (request, response) {
  var req = request;
  response.writeHead(200, { "Content-Type": "textplain" });
  if (req.method === "POST") {
    var body = "";
    req.on("data", function (data) {
      body += data;
    });
    req.on("end", function () {
      console.log("Body: " + body);
      fs.writeFile(
        `/tmp/healthcheck/${new Date().toISOString()}.json`,
        body,
        function (err, data) {
          if (err) {
            console.log("err writing", err);
          }
        }
      );
    });
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end("post received");
  }

  response.end("Undefined request .");
});
