const express = require("express");
const passport = require("passport");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");

// 회원가입
router.post("/", async (req, res, next) => {
  // 유저 있는지
  const exUser = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (exUser) {
    return res.status(403).send("이미 사용중인 이메일입니다");
  }

  const hashedPassword = await bcrypt.hash(req.body.pw, 12); // 암호화된 비밀번호 'npm i bcrypt', 뒤의 12은 10-13사이의 숫자를 넣으며 높을수록 암호화가 쎄짐. 보통 10 or 12
  await User.create({
    nickname: req.body.nickname,
    email: req.body.email,
    pw: hashedPassword,
    code: req.body.code,
  });

  // 회원가입후 바로 로그인처럼 쿠키를 생성해서, 쿠키랑 user정보를 보내줌
  passport.authenticate("local", async (err, user, info) => {
    // 서버에러있으면
    if (err) {
      console.error(err);
      return next(err);
    }
    // 클라이언트에러있으면
    if (info) {
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: { exclude: ["pw"] },
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

/*  로그인전체흐름 
1. 프론트의 /user/login이 실행 
2. 로컬전략에서 email,pw 받아와 (local.js line:8)
3. 로그인을하면 이때 passport/index.js 의 serializeUser실행됨 
실행되면, 쿠키랑 user전체정보가아니라 쿠키랑 user id 만 서버에서 들고있게되고 
4. 프론트로 보낼떄 쿠키랑 user정보를 보내줌 
 */

// 로그인
router.post("/login", (req, res, next) => {
  // 미들웨어 확장법 (req, res, next를 사용하기 위해서)

  passport.authenticate("local", (err, user, info) => {
    // 서버에러있으면
    if (err) {
      console.error(err);
      return next(err);
    }
    // 클라이언트에러있으면
    if (info) {
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      // 이미 user가 있는데 또 찾는 이유는, 비밀번호제외하고받으려고
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: { exclude: ["pw"] }, // 비밀번호 제외하고 받겠다.
      });
      return res.status(200).json(fullUserWithoutPassword); // 프론트로 보낼때 쿠키랑 user정보를 보내줌
    });
  })(req, res, next);
});

// 로그인유지
router.get("/", async (req, res, next) => {
  try {
    if (req.user) {
      const fullUser = await User.findOne({
        where: { id: req.user.id },
        include: [
          {
            model: User,
            as: "Connecter",
            attributes: { exclude: ["code", "email", "pw", "createdAt"] },
          },
          {
            model: User,
            as: "Connected",
            attributes: { exclude: ["code", "email", "pw", "createdAt"] },
          },
        ],
      });

      const partner =
        fullUser.Connected.length > 0
          ? fullUser.Connected[0]
          : fullUser.Connecter[0];

      const result = {
        id: fullUser.id,
        nickname: fullUser.nickname,
        email: fullUser.email,
        sex: fullUser.sex,
        birthday: fullUser.birthday,
        code: fullUser.code,
        photo: fullUser.photo,

        partner: partner
          ? {
              id: partner.dataValues.id,
              nickname: partner.dataValues.nickname,
              sex: partner.dataValues.sex,
              birthday: partner.dataValues.birthday,
              photo: partner.dataValues.photo,
            }
          : undefined,
      };

      res.status(200).json(result);
    }
    res.status(401).json();
  } catch (err) {
    console.error(err);
    next(error);
  }
});

// 추가정보
router.put("/:userId/addInfo", async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
    });
    if (!user) {
      return res.status(403).send("존재하지 않는 유저입니다.");
    }

    await User.update(
      {
        sex: req.body.sex,
        birthday: req.body.birthday,
      },
      {
        where: { id: req.params.userId },
      }
    );
    res.status(200).send("ok");
  } catch (err) {
    res.status(500).send("서버에 추가정보를 저장할수없습니다.");
    console.log(err);
  }
});

// 연인 연결하기
router.post("/:userId/code", async (req, res, next) => {
  try {
    // 나 찾기
    const connected = await User.findOne({
      where: { id: req.params.userId },
    });
    if (!connected) {
      return res.status(403).send("당신은 존재하지 않는 유저입니다.");
    }
    // 코드로 상대방 찾기
    const connecter = await User.findOne({
      where: { code: req.body.code },
    });
    if (!connecter) {
      return res.status(403).send("존재하지 않는 유저랑 연결할수없습니다.");
    }

    await connecter.addConnecter(connected.id);
    res.json({ ConnectedId: connected.id, ConnecterId: connecter.id });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 회원수정
router.put("/:userId", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
    });
    if (!user) {
      return res.status(403).send("존재하지 않는 유저입니다.");
    }
    const result = await User.update(
      {
        photo: req.body.photo,
        nickname: req.body.nickname,
        birthday: req.body.birthday,
        sex: req.body.sex,
      },
      {
        where: { id: req.params.userId },
      }
    );
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
