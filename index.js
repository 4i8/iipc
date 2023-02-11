const WebSocket = require("./lib/ws/websocket");
const WebSocketServer = require("./lib/ws/websocket-server");
const AvailableSecret = require("./lib/processing/AvailableSecret");
class ipc {
  #secret;
  #port;
  #listening;
  constructor(key) {
    process.cacheipc = process.cacheipc || [];
    this.#secret = `${key}`;
    this.#port = typeof key === "number" ? key : 0;
    this.#listening = false;
    if (typeof key === "number") {
      if (key < 1024 || key > 65535) {
        throw new Error("Must be between 1024 and 65535");
      }
    }
  }
  async on(event, callback) {
    const secret = this.#secret;
    if (!event === "receive") throw new Error("Invalid event");
    if (await AvailableSecret(secret)) {
      throw new Error(`Already used on this secret ${this.#secret}`);
    }
    const wss = new WebSocketServer({
      path:
        "/ipc_9ajaxVjVtI0L0LtV_04jtGF0710V7L5020Im1D307F0gvF0N5AMx5gxo0_g0og6dx06g0g" +
        secret,
      port: this.#port,
    });
    if (this.#listening || process.cacheipc.includes(secret)) {
      throw new Error(`Already used on this secret ${this.#secret}`);
    }
    process.cacheipc.push(secret);
    this.#listening = true;
    wss.on("listening", (err) => {
      this.#port = wss.address().port;
    });
    wss.on("connection", (ws) => {
      ws.on("message", (message) => {
        const data = JSON.parse(message);
        if (data.secret !== secret) return;
        callback({
          res: data.res,
          resolve: (data) => {
            if (data === undefined) data = undefined;
            ws.send(
              JSON.stringify({
                secret: secret,
                return: data,
              })
            );
          },
        });
      });
    });
  }
  port() {
    return this.#port;
  }
}
const client = async (secret, res) => {
  return new Promise(async (resolve, reject) => {
    const $$PORT = await AvailableSecret(secret);
    if (!$$PORT) throw new Error("Invalid secret");
    secret = `${secret}`;
    const ws = new WebSocket(
      "ws://localhost:" +
        $$PORT +
        "/ipc_9ajaxVjVtI0L0LtV_04jtGF0710V7L5020Im1D307F0gvF0N5AMx5gxo0_g0og6dx06g0g" +
        secret
    );
    ws.on("error", (err) => {
      if (err.message.includes("ECONNREFUSED")) {
        reject(new Error("Connection refused, make sure you have started ipc"));
        return;
      }
      reject(err);
    });
    ws.on("open", () => {
      ws.send(
        JSON.stringify({
          secret,
          res,
        })
      );
      ws.on("message", (message) => {
        const data = JSON.parse(message);
        if (data.secret !== secret) return;
        resolve(data.return);
        ws.close();
      });
    });
  });
};
module.exports = {
  ipc,
  client,
};
