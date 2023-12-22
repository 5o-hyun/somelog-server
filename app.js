const express = require("express");
const scheduleRouter = require("./routes/schedule");
const schedulesRouter = require("./routes/schedules");
const colorRouter = require("./routes/color");
const memoRouter = require("./routes/memo");
const memosRouter = require("./routes/memos");
const userRouter = require("./routes/user");
const connectRouter = require("./routes/connect");
const db = require("./models");
const passportConfig = require("./passport");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser"); // npm i cookie-parser
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config(); // dotenv 설정적용
passportConfig(); // passport 설정적용

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

// app.use(cors({ origin: true, credentials: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// 프론트에서 보낸 데이터를 req.body에 넣어주기위해 이 두가지 작성.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    // 하위 두개는 왠만하면 false
    saveUninitialized: false,
    resave: false,
  })
);
// 이 부분의 설정은 반드시 세션 뒤에 사용해야한다.
app.use(passport.initialize()); // passport를 사용한다고 express에게 알린다.
app.use(passport.session()); // session을 사용하여 passport를 동작시킨다고 express에게 알린다.

app.get("/", (req, res) => {
  res.send("hello express");
});

app.use("/schedule", scheduleRouter);
app.use("/schedules", schedulesRouter);
app.use("/color", colorRouter);
app.use("/memo", memoRouter);
app.use("/memos", memosRouter);
app.use("/user", userRouter);
app.use("/connect", connectRouter);

app.listen(3065, () => {
  console.log("서버 실행중!!");
});
