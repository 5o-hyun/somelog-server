const dayjs = require("dayjs");

module.exports = (sequelize, DataTypes) => {
  const Connect = sequelize.define(
    "Connect",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // 기본키
        autoIncrement: true, // 자동생성
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Y", // 기본값
      },
      startDate: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: dayjs().format("YYYY-MM-DD"),
      },
      postitStatus: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Y", // 기본값
      },
      sliderStatus: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Y", // 기본값
      },
      feelStatus: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Y", // 기본값
      },
      memoStatus: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Y", // 기본값
      },
      DdayStatus: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Y", // 기본값
      },
    },
    { freezeTableName: true } // 테이블이름 s안붙이기
  );
  Connect.associate = (db) => {
    db.Connect.hasMany(db.ConnectImage, {
      foreignKey: "connectId",
    }); // 한개의 커플은 여러이미지를 가질수있다. 1:N
  };
  return Connect;
};
