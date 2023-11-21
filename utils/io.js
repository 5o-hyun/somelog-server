module.exports = function (io) {
  // io 관련된 모든일~~~ 말하는함수 emit(), 듣는함수 on()
  io.on("connection", async (socket) => {
    console.log("client is connected", socket.id);

    socket.on("disconnect", async () => {
      console.log("user is disconnected");
    });
  });
};
