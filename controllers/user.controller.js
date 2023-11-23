const User = require("../models/user");
const userController = {};

userController.saveUser = async (userName, socketId) => {
  // 1. 이미 있는 유저인지 확인
  let user = await User.findOne({ name: userName });
  // 2. 없다면 새로 유저정보 만들기
  if (!user) {
    user = new User({
      name: userName,
      token: socketId,
      online: true,
    });
  }
  // 3. 이미 있는 유저면 연결정보 token값만 바꿔주자
  user.token = socketId;
  user.online = true;

  // user를 저장하고 리턴
  await user.save();
  return user;
};

userController.checkUser = async (socketId) => {
  const user = await User.findOne({ token: socketId });
  if (!user) throw new Error("user not found");
  return user;
};

module.exports = userController;
