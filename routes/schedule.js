const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.json({ id: 1, content: "작성완료" });
});

module.exports = router;
