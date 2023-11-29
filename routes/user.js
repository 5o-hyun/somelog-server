const express = require("express");
const router = express.Router();
const { User } = require("../models");

// 회원가입
router.post("/", async (req, res) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 이메일입니다");
    }

    await User.create({
      nickname: req.body.nickname,
      email: req.body.email,
      pw: req.body.pw,
    });
    res.status(201).send("ok");
  } catch (err) {
    res.status(500).send("회원등록을 할수없습니다.");
    console.log(err);
  }
});

module.exports = router;
