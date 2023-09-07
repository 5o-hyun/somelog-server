const express = require("express");
const scheduleRouter = require("./routes/schedule");
const db = require("./models");
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("db연결성공");
  })
  .catch(console.error);

app.get("/", (req, res) => {
  res.send("hello express");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/schedule", scheduleRouter);

app.listen(3065, () => {
  console.log("서버 실행중!!");
});
