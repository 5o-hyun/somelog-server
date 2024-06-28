const dayjs = require("dayjs");

module.exports = (sequelize, DataTypes) => {
  const Celebration = sequelize.define("Celebration", {
    // id:{}, mysql에 기본적으로 들어있다.
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: dayjs().format("YYYY-MM-DD"),
    },
    icon: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
  Celebration.associate = (db) => {
    db.Celebration.belongsTo(db.Sticker); // 기념일은 한개의 스티커를 갖는다 N:1
  };
  return Celebration;
};
