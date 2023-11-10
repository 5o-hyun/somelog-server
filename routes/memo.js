const express = require("express");
const { Memo } = require("../models");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    await Memo.create({
      title: req.body.title,
      detail: req.body.detail,
    });
    res.status(201).send("ok");
  } catch (err) {
    res.status(500).send("메모를 등록할수없습니다.");
  }
});

module.exports = router;
