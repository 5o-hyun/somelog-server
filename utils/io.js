const userController = require("../controllers/user.controller");

module.exports = function (io) {
  // io 관련된 모든일~~~ 말하는함수 emit(), 듣는함수 on()
  io.on("connection", async (socket) => {
    console.log("client is connected", socket.id);

    socket.on("login", async (userName, cb) => {
      console.log("backend", userName);
      // 유저정보를 저장
      try {
        const user = await userController.saveUser(userName, socket.id);
        cb({ ok: true, data: user });
      } catch (err) {
        cb({ ok: false, error: err.message });
      }
    });

    socket.on("disconnect", async () => {
      console.log("user is disconnected");
    });
  });
};
