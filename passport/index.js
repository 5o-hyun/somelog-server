const passport = require("passport");
const local = require("./local");
const { User } = require("../models");

module.exports = () => {
  // 로그인하기
  passport.serializeUser((user, done) => {
    // null - 서버 에러
    // user.id - 성공해서 user의 id를 가져온다.
    done(null, user.id);
  });

  // 서버에서 유저에 대한 모든 정보를 갖고 있게되면, 서버 과부화가 생기게된다.
  // 그래서 서버는 id만 갖고있다가, 페이지 이동 시 필요한 유저 정보는 DB에서 찾아서 가져온다.
  // 그게 deserializeUser 역할이다.

  // deserializeUser : serializeUser가 한번 성공하면 그다음 요청부터는 계속 실행. id를 가지고 서버에서 user를 복구해서 req.user에 넣어줌
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user); // req.user
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
