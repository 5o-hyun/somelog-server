const express = require("express");
const scheduleRouter = require("./routes/schedule");
const schedulesRouter = require("./routes/schedules");
const categoryRouter = require("./routes/category");
const memoRouter = require("./routes/memo");
const memosRouter = require("./routes/memos");
const db = require("./models");
const cors = require("cors");
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("db연결성공");
  })
  .catch(console.error);

app.use(cors({ origin: true, credentials: true }));
// 프론트에서 보낸 데이터를 req.body에 넣어주기위해 이 두가지 작성.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello express");
});

app.use("/schedule", scheduleRouter);
app.use("/schedules", schedulesRouter);
app.use("/category", categoryRouter);
app.use("/memo", memoRouter);
app.use("/memos", memosRouter);

app.listen(3065, () => {
  console.log("서버 실행중!!");
});
