const express = require("express");
const router = express.Router();
const { Schedule } = require("../models");

router.get("/", async (req, res) => {
  try {
    const schedules = await Schedule.findAll({});
    res.status(200).json(schedules);
  } catch (err) {
    res.status(500).send("일정전체를 조회할수없습니다.");
  }
});

module.exports = router;
