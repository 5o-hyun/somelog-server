const express = require("express");
const router = express.Router();
const { Schedule } = require("../models");

router.post("/", async (req, res) => {
  try {
    await Schedule.create({
      title: req.body.title,
      memo: req.body.memo,
      date: req.body.date,
      category: req.body.category,
    });
    res.status(201).send("ok");
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
