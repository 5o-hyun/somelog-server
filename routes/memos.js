const express = require("express");
const { Memo } = require("../models");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const memos = await Memo.findAll({});
    res.status(200).json(memos);
  } catch (err) {
    res.status(500).send("메모리스트를 조회할수없습니다.");
  }
});

module.exports = router;
