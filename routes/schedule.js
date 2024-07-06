const express = require("express");
const router = express.Router();
const { Schedule } = require("../models");

// 일정조회
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

// 일정등록
router.post("/", async (req, res) => {
  try {
    await Schedule.create({
      title: req.body.title,
      memo: req.body.memo,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      color: req.body.color,
      UserId: req.body.UserId,
      sticker: req.body.sticker,
    });
    res.status(201).send("ok");
  } catch (err) {
    res.status(500).send("일정을 등록할수없습니다.");
  }
});

// 일정수정
router.put("/:scheduleId", async (req, res) => {
  try {
    const schedule = await Schedule.findOne({
      where: { id: req.params.scheduleId },
    });
    if (!schedule) {
      res.status(403).send("존재하지 않는 일정입니다.");
    }
    if (req.body.sticker) {
      await Schedule.update(
        {
          title: req.body.title,
          memo: req.body.memo,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          color: req.body.color,
          UserId: req.body.UserId,
          sticker: req.body.sticker,
        },
        {
          where: { id: req.params.scheduleId },
        }
      );
    } else {
      await Schedule.update(
        {
          title: req.body.title,
          memo: req.body.memo,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          color: req.body.color,
          UserId: req.body.UserId,
          sticker: null,
        },
        {
          where: { id: req.params.scheduleId },
        }
      );
    }
    res.status(200).send("일정을 변경하였습니다.");
  } catch (err) {
    console.error(err);
    res.status(500).send("일정을 수정할수없습니다.");
  }
});

// 일정삭제
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

// 기념일삭제
router.put("/:scheduleId/celebration", async (req, res) => {
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
        color: req.body.color,
        UserId: req.body.UserId,
        sticker: null,
      },
      {
        where: { id: req.params.scheduleId },
      }
    );

    res.status(200).send("기념일을 해제했습니다.");
  } catch (err) {
    res.status(500).send("기념일을 해제할수없습니다.");
  }
});

module.exports = router;
