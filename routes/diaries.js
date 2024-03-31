const express = require("express");
const { Op } = require("sequelize");
const { User, Diary, DiaryImage } = require("../models");
const router = express.Router();

// 유저+유저파트너의 전체 메모목록 조회 /memos/:userId
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
      ],
      order: [["date", "ASC"]], // 오래된 날짜일수록 아래로
    });
    res.status(200).json(diaries);
  } catch (err) {
    res.status(500).send("메모리스트를 조회할수없습니다.");
  }
});

module.exports = router;
