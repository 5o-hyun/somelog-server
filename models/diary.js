const dayjs = require("dayjs");

module.exports = (sequelize, DataTypes) => {
  const Diary = sequelize.define(
    "Diary",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // 자동생성
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true, // 선택값
      },
    },
    { freezeTableName: true } // 테이블이름 s안붙이기
  );
  Diary.associate = (db) => {
    db.Diary.hasMany(db.DiaryImage); // 한개의 다이어리는 여러이미지를 가질수있다. 1:N
    db.Diary.belongsTo(db.User); // 한개의 다이어리는 어떤 user에게 속해있다. 1:N
  };
  return Diary;
};
