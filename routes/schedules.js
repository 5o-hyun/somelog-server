const express = require("express");
const router = express.Router();
const { Schedule, User } = require("../models");
const { Op } = require("sequelize");

// 유저+유저파트너의 전체 스케줄목록 조회 /schedules/:userId
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

    const schedules = await Schedule.findAll({
      where: {
        [Op.or]: [
          { UserId: req.params.userId },
          { UserId: partner.dataValues.id },
        ],
      },
    });
    res.status(200).json(schedules);
  } catch (err) {
    res.status(500).send("일정전체를 조회할수없습니다.");
  }
});

module.exports = router;
