const express = require("express");
const router = express.Router();
const { Schedule } = require("../models");

router.get("/:scheduleId", async (req, res) => {
  try {
    const schedule = await Schedule.findOne({
      where: { id: req.params.scheduleId },
    });
    res.status(200).json(schedule);
  } catch (err) {
    res.status(500).send("일정을 조회할수없습니다.");
  }
});

router.post("/", async (req, res) => {
  try {
    await Schedule.create({
      title: req.body.title,
      memo: req.body.memo,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      category: req.body.category,
    });
    res.status(201).send("ok");
  } catch (err) {
    res.status(500).send("일정을 등록할수없습니다.");
  }
});

router.put("/:scheduleId", async (req, res) => {
  try {
    const schedule = await Schedule.findOne({
      where: { id: req.params.scheduleId },
    });
    if (!schedule) {
      res.status(403).send("존재하지 않는 일정입니다.");
    }
    await Schedule.update(
      {
        title: req.body.title,
        memo: req.body.memo,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        category: req.body.category,
      },
      {
        where: { id: req.params.scheduleId },
      }
    );
    res.status(200).send("일정을 변경하였습니다.");
  } catch (err) {
    console.error(err);
    res.status(500).send("일정을 수정할수없습니다.");
  }
});

router.delete("/:scheduleId", async (req, res) => {
  try {
    await Schedule.destroy({
      where: {
        id: req.params.scheduleId,
      },
    });
    res.status(200).send("일정이 삭제되었습니다.");
  } catch (err) {
    res.status(500).send("일정을 삭제할수없습니다.");
  }
});

module.exports = router;
