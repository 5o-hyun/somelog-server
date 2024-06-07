const chatController = require("../controllers/chat.controller");
const userController = require("../controllers/user.controller");

module.exports = function (io) {
  // io 관련된 모든일~~~ 말하는함수 emit(), 듣는함수 on()
  io.on("connection", async (socket) => {
    // console.log("client is connected", socket.id);

    socket.on("login", async (userName, cb) => {
      // 유저정보를 저장
      try {
        const user = await userController.saveUser(userName, socket.id);
        const welcomeMessage = {
          chat: `${userName} is joined to this room`,
          user: { id: null, name: "system" },
        };
        io.emit("message", welcomeMessage);
        cb({ ok: true, data: user });
      } catch (err) {
        cb({ ok: false, error: err.message });
      }
    });

    socket.on("sendMessage", async (message, cb) => {
      try {
        // 유저찾기 socket.id로
        const user = await userController.checkUser(socket.id);
        // 메세지 저장
        const newMessage = await chatController.saveChat(message, user);
        // 서버가 새로운메세지를 모두에게 알려야함
        io.emit("message", newMessage);

        cb({ ok: true });
      } catch (err) {
        cb({ ok: false, error: err.message });
      }
    });

    socket.on("disconnect", async () => {
      // console.log("user is disconnected");
    });
  });
};
