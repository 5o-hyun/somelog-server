const express = require("express");
const { Diary, DiaryImage, DiaryComment } = require("../models");
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

// 댓글 생성
router.post("/:diaryId/comment", async (req, res) => {
  try {
    const diary = await Diary.findOne({
      where: { id: req.body.diaryId },
    });
    if (!diary) {
      return res.status(403).send("존재하지않는 게시물입니다.");
    }
    if (!req.body.userId) {
      return res.status(403).send("존재하지않는 유저입니다.");
    }
    if (!req.body.comment) {
      return res.status(403).send("댓글을 작성해주세요.");
    }

    await DiaryComment.create({
      DiaryId: req.body.diaryId,
      UserId: req.body.userId,
      comment: req.body.comment,
    });

    res.status(201).send("댓글이 정상적으로 등록되었습니다.");
  } catch (err) {
    res.status(500).send("댓글을 등록할수없습니다.");
  }
});

module.exports = router;
