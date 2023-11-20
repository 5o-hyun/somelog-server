const { createServer } = require("http");
const app = require("./app");
const { Server } = require("socket.io");
require("dotenv").config();

const httpServer = createServer(app); // http위에 express로만든 app얹는다.
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
}); // 웹소켓서버를 만들어서 httpServer얹는다.

require("./utils/io")(io);
httpServer.listen(process.env.PORT, () => {
  console.log("server listening on port", process.env.PORT);
}); // 서버를 켜놓는다.
