const WebSocket = require("../../lib/ws/websocket");
const getPorts = require("./getPorts");
function AvailableSecret(secret) {
  return new Promise(async (resolve, reject) => {
    const PORTS = await getPorts().then((r) => r);
    function $(port) {
      return new Promise(async (resolve) => {
        const $WS = new WebSocket(
          "ws://localhost:" +
            port +
            "/ipc_9ajaxVjVtI0L0LtV_04jtGF0710V7L5020Im1D307F0gvF0N5AMx5gxo0_g0og6dx06g0g" +
            secret
        );
        $WS.on("error", (err) => {
          resolve(
            err.toString().replace(/\s/g, "") ===
              "Error:Unexpectedserverresponse:400"
              ? false
              : false
          );
          $WS.close();
        });
        $WS.on("open", () => {
          resolve(port);
          $WS.close();
        });
        setTimeout(() => {
          resolve(false);
        }, 100);
      });
    }
    let LIST = [];
    for (var i = 0; i < PORTS.length; i++) {
      const I = await $(PORTS[i]);
      LIST.push(I);
    }
    resolve(
      LIST.length <= 0
        ? false
        : LIST.filter((r) => parseInt(r)).length > 0
        ? LIST.filter((r) => parseInt(r))[0]
        : false
    );
  });
}
module.exports = AvailableSecret;
