const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local"); // Strategy -> LocalStrategy로 이름 변경
const { User } = require("../models");
const bcrypt = require("bcrypt");
const user = require("../models/user");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email", // req.body.email 라고 명시적으로 알려줌 (정확한 명을 넣어야한다.)
        passwordField: "pw",
      },
      async (email, pw, done) => {
        try {
          // 이메일있는지
          const user = await User.findOne({
            where: {
              email: email,
            },
          });
          if (!user) {
            return done(null, false, { reason: "존재하지 않는 이메일입니다." }); // done으로 결과판단. (서버에러, 성공여부, 클라이언트에러)
          }

          // 비밀번호 비교체크 (user.pw:사용자가입력한비번, pw:DB에있는비번)
          // 입력한비번과 db에있는비번이 일치하는지. => 일치하면 사용자정보넘기고 일치안하면 에러
          const result = await bcrypt.compare(pw, user.pw);
          // 1) 비밀번호 일치할경우
          if (result) {
            return done(null, user);
          }
          // 2) 비밀번호 일치하지않을경우
          return done(null, false, { reason: "비밀번호가 틀렸습니다." });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
