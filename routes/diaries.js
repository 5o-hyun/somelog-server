const express = require("express");
const { Op } = require("sequelize");
const { User, Diary, DiaryImage, DiaryComment } = require("../models");
const router = express.Router();

// 유저+유저파트너의 전체 다이어리목록 조회
router.get("/:userId", async (req, res) => {
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
    console.log(err);
    res.status(500).send("메모리스트를 조회할수없습니다.");
  }
});

module.exports = router;