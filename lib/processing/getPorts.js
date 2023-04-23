const { exec } = require("child_process");
const os = require("os");
const wait = (ms) => new Promise((r) => setTimeout(() => r(true), ms));
function getPorts() {
  return new Promise(async (resolve, reject) => {
    const CommandType = os.type().toLowerCase().includes("windows")
      ? "netstat -a -b"
      : os.type().toLowerCase().includes("linux")
      ? "netstat -plnt"
      : "lsof -i -P | grep LISTEN | grep :$PORT";
    await wait(
      Array(100)
        .fill(1)
        .map((i, ii) => i + ii)[Math.floor(Math.random() * 100)]
    );
    exec(
      CommandType,
      {
        cwd: __dirname,
      },
      (error, stdout) => {
        if (error?.length > 0) {
          throw new Error(
            error +
              `\ninstall netstat or lsof or report this bug here [IPC]https://github.com/4i8/iipc/issues`
          );
          return;
        }
        if (os.type().toLowerCase().includes("windows")) {
          resolve(
            stdout
              .split("\n")
              .slice(2)
              .filter((r) => r)
              .filter((r) => r.includes("LISTENING"))
              .toString()
              .split(" ")
              .map((re) => {
                if (
                  re.includes("[::]:") &&
                  typeof parseInt(re.replace("[::]:", "")) === "number"
                ) {
                  return parseInt(re.replace("[::]:", ""));
                }
              })
              .filter((r) => r)
          );
        } else if (os.type().toLowerCase().includes("linux")) {
          resolve(
            stdout
              .split("\n")
              .slice(2)
              .filter((r) => r)
              .filter((r) => r.includes("LISTEN"))
              .toString()
              .split(" ")
              .map((re) => {
                if (
                  re.includes(":::") &&
                  typeof parseInt(re.replace(":::", "")) === "number"
                ) {
                  return parseInt(re.replace(":::", ""));
                }
              })
              .filter((r) => r)
          );
        } else {
          resolve(
            stdout
              .split("\n")
              .filter((r) => r)
              .toString()
              .split(" ")
              .map((re) => {
                if (
                  typeof parseInt(re) === "number" &&
                  /^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/gi.test(
                    re
                  )
                ) {
                  return parseInt(re);
                }
              })
              .filter((r) => r)
          );
        }
      }
    );
  });
}
module.exports = getPorts;
