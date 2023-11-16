const express = require("express");
const { Memo } = require("../models");
const router = express.Router();

router.get("/:memoId", async (req, res) => {
  try {
    const memo = await Memo.findOne({ where: { id: req.params.memoId } });
    res.status(200).json(memo);
  } catch (err) {
    res.status(500).send("메모를 조회할수없습니다.");
  }
});

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

router.delete("/:memoId", async (req, res) => {
  try {
    await Memo.destroy({
      where: {
        id: req.params.memoId,
      },
    });
    res.status(200).send("메모가 삭제되었습니다.");
  } catch (err) {
    res.status(500).send("메모를 삭제할수없습니다.");
  }
});

module.exports = router;
