const express = require("express");
const { Op } = require("sequelize");
const { User, Diary, DiaryImage, DiaryComment } = require("../models");
const router = express.Router();

// 유저+유저파트너의 전체 다이어리목록 조회
router.get("/:userId", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const fullUser = await User.findOne({
      where: { id: req.params.userId },
      include: [
        {
          model: User,
          as: "Connecter",
          attributes: { exclude: ["code", "email", "pw", "createdAt"] },
        },
        {
          model: User,
          as: "Connected",
          attributes: { exclude: ["code", "email", "pw", "createdAt"] },
        },
      ],
    });

    const partner =
      fullUser.Connected.length > 0
        ? fullUser.Connected[0]
        : fullUser.Connecter[0];

    const diaries = await Diary.findAll({
      where: {
        [Op.or]: [
          { UserId: req.params.userId },
          { UserId: partner.dataValues.id },
        ],
      },
      include: [
        {
          model: DiaryImage,
          attributes: ["imagePath"],
          order: [["updatedAt", "DESC"]],
        },
        {
          model: DiaryComment,
          attributes: ["UserId"],
          include: [{ model: User, attributes: ["photo"] }],
        },
      ],
      order: [["date", "DESC"]], // 오래된 날짜일수록 아래로
      limit,
      offset,
    });

    // DiaryComment의 UserId 중복되면 제거
    const distinctCommentUsers = diaries.map((entry) => {
      const { dataValues } = entry;
      const { DiaryComments } = dataValues;

      const uniqueComments = DiaryComments.filter(
        (comment, index, self) =>
          index === self.findIndex((c) => c.UserId === comment.UserId)
      );

      return {
        ...dataValues,
        DiaryComments: uniqueComments,
      };
    });

    res.status(200).json(distinctCommentUsers);
  } catch (err) {
    console.error(err);
    res.status(500).send("다이어리 목록을 조회할수없습니다.");
  }
});

// 유저+유저파트너의 전체 폴라로이드 조회
router.get("/:userId/polaroid", async (req, res) => {
  try {
    const fullUser = await User.findOne({
      where: { id: req.params.userId },
      include: [
        {
          model: User,
          as: "Connecter",
          attributes: { exclude: ["code", "email", "pw", "createdAt"] },
        },
        {
          model: User,
          as: "Connected",
          attributes: { exclude: ["code", "email", "pw", "createdAt"] },
        },
      ],
    });

    const partner =
      fullUser.Connected.length > 0
        ? fullUser.Connected[0]
        : fullUser.Connecter[0];

    const polaroid = await Diary.findAll({
      attributes: ["id", "date", "title"],
      where: {
        [Op.or]: [
          { UserId: req.params.userId },
          { UserId: partner.dataValues.id },
        ],
      },
      include: [
        {
          model: DiaryImage,
          attributes: ["imagePath"],
        },
      ],
    });

    // 랜덤한 imagePath를 선택하는 함수
    function getRandomImagePath(images) {
      if (images.length === 0) return null;
      const randomIndex = Math.floor(Math.random() * images.length);
      return images[randomIndex].imagePath;
    }

    // 각 다이어리 항목에 대해 랜덤한 imagePath 선택
    const result = polaroid.map((entry) => {
      const randomImagePath = getRandomImagePath(entry.DiaryImages);
      return {
        id: entry.id,
        date: entry.date,
        title: entry.title,
        imagePath: randomImagePath,
      };
    });

    console.log(result);

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("폴라로이드를 조회할수없습니다.");
  }
});

module.exports = router;
