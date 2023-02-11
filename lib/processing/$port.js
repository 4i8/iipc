const net = require("net");
function $PORT(port) {
  return new Promise((resolve, reject) => {
    var server = net.createServer();
    server.once("error", function (err) {
      if (err.code === "EADDRINUSE") {
        resolve(false);
      }
    });
    server.once("listening", function (e) {
      server.close();
      resolve(true);
    });
    server.listen(port);
  });
}
module.exports = $PORT;
//@D
