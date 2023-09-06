const express = require("express");
const scheduleRouter = require("./routes/schedule");

const app = express();

app.get("/", (req, res) => {
  res.send("hello express");
});

app.get("/posts", (req, res) => {
  res.json([
    { id: 1, content: "hello1" },
    { id: 2, content: "hello2" },
    { id: 3, content: "hello3" },
  ]);
});

app.post("/post", (req, res) => {
  res.json({ id: 1, content: "작성완료" });
});

app.use("/schedule", scheduleRouter);

app.listen(3065, () => {
  console.log("서버 실행중");
});
