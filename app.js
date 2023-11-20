const express = require("express");
const scheduleRouter = require("./routes/schedule");
const schedulesRouter = require("./routes/schedules");
const categoryRouter = require("./routes/category");
const memoRouter = require("./routes/memo");
const memosRouter = require("./routes/memos");
const db = require("./models");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("몽고db연결"));

db.sequelize
  .sync()
  .then(() => {
    console.log("MySQL db연결");
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
