const express = require("express");
const { Op } = require("sequelize");
const { Connect, User } = require("../models");
const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    // 유저, 파트너 찾기
    const user = await User.findOne({
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
      user.Connected.length > 0 ? user.Connected[0] : user.Connecter[0];

    // 유저id랑 파트너id가 connect되어있는지,활성화되어있는지 찾아보기
    const connect = await Connect.findOne({
      where: {
        [Op.or]: [
          {
            ConnectedId: user.id,
            ConnecterId: partner.id,
            status: "Y",
          },
          {
            ConnectedId: partner.id,
            ConnecterId: user.id,
            status: "Y",
          },
        ],
      },
    });
    // 없으면 리턴
    if (!connect) {
      return res.status(403).send("연결이 된 연인이 없습니다.");
    }
    // 있으면 그 row전체를 반환해서 리턴
    return res.status(200).json(connect);
  } catch (err) {
    res.status(500).send("연인관계를 조회할수없습니다.");
  }
});

router.put("/:connectId", async (req, res) => {
  try {
    const connect = await Connect.findOne({
      where: { id: req.params.connectId },
    });
    if (!connect) {
      return res.status(403).send("연결이 된 연인이 없습니다.");
    }
    const result = await Connect.update(
      {
        status: req.body.status,
        startDate: req.body.startDate,
        postitStatus: req.body.postitStatus,
        sliderStatus: req.body.sliderStatus,
        feelStatus: req.body.feelStatus,
        memoStatus: req.body.memoStatus,
        DdayStatus: req.body.DdayStatus,
      },
      {
        where: { id: req.params.connectId },
      }
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send("연인관계를 조회할수없습니다.");
  }
});

module.exports = router;
