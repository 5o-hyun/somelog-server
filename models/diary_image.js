const dayjs = require("dayjs");

module.exports = (sequelize, DataTypes) => {
  const DiaryImage = sequelize.define("DiaryImage", {
    //   id:{}, 기본적으로들어있다.
    imagePath: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: dayjs().format("YYYY-MM-DD"),
    },
  });
  DiaryImage.associate = (db) => {
    db.DiaryImage.belongsTo(db.Diary); // 한개의 이미지는 여러다이어리를 가질수없다. 1:N
  };
  return DiaryImage;
};
