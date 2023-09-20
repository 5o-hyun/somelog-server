const express = require("express");
const router = express.Router();
const { Category } = require("../models");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({});
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).send("카테고리를 조회할수없습니다.");
  }
});

router.post("/", async (req, res) => {
  try {
    await Category.create({
      category: req.body.category,
      color: req.body.color,
    });
    res.status(201).send("ok");
  } catch (err) {
    res.status(500).send("카테고리를 등록할수없습니다.");
  }
});

module.exports = router;
