const express = require("express");
const router = express.Router();
const { Sticker } = require("../models");

router.get("/list", async (req, res) => {
  try {
    const stickers = await Sticker.findAll({ attributes: ["id", "imagePath"] });
    res.status(200).json(stickers);
  } catch (err) {
    res.status(500).send("스티커목록을 조회할수없습니다.");
  }
});

router.post("/", async (req, res) => {
  try {
    await Sticker.create({
      imagePath: req.body.imagePath,
    });
    res.status(201).send("ok");
  } catch (err) {
    res.status(500).send("스티커를 등록할수없습니다.");
  }
});

module.exports = router;
