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

router.put("/:categoryId", async (req, res) => {
  try {
    const category = await Category.findOne({
      where: { id: req.params.categoryId },
    });
    if (!category) {
      return res.status(403).send("존재하지 않는 카테고리입니다.");
    }
    await Category.update(
      {
        category: req.body.category,
        color: req.body.color,
      },
      {
        where: { id: req.params.categoryId },
      }
    );
    res.status(201).send("카테고리를 변경하였습니다.");
  } catch (err) {
    console.error(error);
    res.status(500).send("카테고리를 수정할수없습니다.");
  }
});

module.exports = router;
