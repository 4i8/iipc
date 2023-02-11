<div align="center">
  <p>
 <a href="https://www.npmjs.com/package/iipc"><img src="https://img.shields.io/npm/v/iipc.svg?style=for-the-badge" alt="NPM version" /></a>
 <a href="https://www.npmjs.com/package/iipc"><img src="https://img.shields.io/npm/dt/iipc.svg?maxAge=3600&style=for-the-badge" alt="NPM downloads" /></a>
 <img src="https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black" alt="Linux" />
 <img src="https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white" alt="windows" />
 <img src="https://img.shields.io/badge/mac%20os-000000?style=for-the-badge&logo=macos&logoColor=F0F0F0" alt="macos" />
  <img src="https://img.shields.io/badge/WS-black?style=for-the-badge&logo=WebStorm&badgeColor=010101" alt="websooket" />
    <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="websooket" />
  <a href="https://www.npmjs.com/package/iipc"><img src="https://img.shields.io/npm/l/iipc.svg?maxAge=3600&style=for-the-badge" alt="license" /></a>
  </p>
  
</div>

# **iipc**

**iipc is a simple Inter Process Communication for nodejs built on [ws](https://www.npmjs.com/package/ws) to communicate between processes safely and easily using tcp and websocket, You can also return data to the client see ([example](#example))**

# **Important:**

**this package is not biased and does not have any hidden features that can harm the user Fun use**

# **Installation**

# **Linux**

**Must install netstat**

```sh-session
sudo apt-get install net-tools
```

```sh-session
npm install iipc
yarn add iipc
```

# **Windows**
**Tested on Windows 10**
```sh-session
npm install iipc
yarn add iipc
```

# **MacOS**

**Not Tested on MacOS, but we hope it works if your device is a MacOS, please let us know if it works**

# Example

## index.js process 1

```js
const { ipc } = require("iipc");
const $ = new ipc("test"); // This is the secret that will be used to authenticate the client
$.on("listening", () => {
  console.log("IPC IS ON! Enjoy");
});
//custom port use: new ipc(8080);
$.on("receive", ({ res, resolve }) => {
  console.log(res); //Hello

  resolve("Hi!"); // This is the data that will be sent back to the client

  //if you don't use resolve, the client will wait forever and promise will never resolve
});
```

## client.js process 2

```js
const { client } = require("iipc");
client("test", "Hello").then((back) => {
  console.log(back); //Hi!
});
//custom port use: client(8080, "Hello");
```

## Links

- [Twiter](https://twitter.com/onlyarth)
- [Github](https://github.com/4i8)

## License

- [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)
