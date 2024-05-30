const dayjs = require("dayjs");

module.exports = (sequelize, DataTypes) => {
  const DiaryComment = sequelize.define("DiaryComment", {
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  DiaryComment.associate = (db) => {
    db.DiaryComment.belongsTo(db.Diary); // 한개의 댓글은 여러다이어리를 가질수없다. 1:N
    db.DiaryComment.belongsTo(db.User);
  };
  return DiaryComment;
};
