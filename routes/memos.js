const express = require("express");
const { Op } = require("sequelize");
const { Memo, User } = require("../models");
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

    const memos = await Memo.findAll({
      where: {
        [Op.or]: [
          { UserId: req.params.userId },
          { UserId: partner.dataValues.id },
        ],
      },
      order: [["updatedAt", "DESC"]], // 새로 수정한 글순서
    });
    res.status(200).json(memos);
  } catch (err) {
    res.status(500).send("메모리스트를 조회할수없습니다.");
  }
});

module.exports = router;
