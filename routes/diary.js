const express = require("express");
const { Diary, DiaryImage } = require("../models");
const router = express.Router();

// 다이어리 조회
router.get("/:diaryId", async (req, res) => {
  try {
    const diary = await Diary.findOne({
      where: { id: req.params.diaryId },
      include: [
        {
          model: DiaryImage,
          attributes: ["id", "imagePath"],
        },
      ],
    });
    res.status(200).json(diary);
  } catch (err) {
    res.status(500).send("다이어리를 조회할수없습니다.");
  }
});

// 다이어리 생성
router.post("/", async (req, res) => {
  try {
    const createdDiary = await Diary.create({
      date: req.body.date,
      title: req.body.title,
      UserId: req.body.userId,
    });

    const files = req.body.files;

    const createdDiaryImage = await Promise.all(
      files.map(async (file) => {
        return await DiaryImage.create({
          imagePath: file.url,
          DiaryId: createdDiary.id,
        });
      })
    );

    res.status(201).send("ok");
  } catch (err) {
    res.status(500).send("다이어리를 등록할수없습니다.");
    console.error(err);
  }
});

module.exports = router;
