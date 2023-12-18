const express = require("express");
const router = express.Router();
const { Color } = require("../models");

router.get("/", async (req, res) => {
  try {
    const colors = await Color.findAll({});
    res.status(200).json(colors);
  } catch (err) {
    res.status(500).send("팔레트를 조회할수없습니다.");
  }
});

router.post("/", async (req, res) => {
  try {
    await Color.create({
      name: req.body.name,
      color: req.body.color,
    });
    res.status(201).send("ok");
  } catch (err) {
    res.status(500).send("컬러를 등록할수없습니다.");
  }
});

module.exports = router;
