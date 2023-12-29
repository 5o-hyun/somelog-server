const dayjs = require("dayjs");

module.exports = (sequelize, DataTypes) => {
  const ConnectImage = sequelize.define("ConnectImage", {
    //   id:{}, 기본적으로들어있다.
    connectId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    imagePath: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: dayjs().format("YYYY-MM-DD"),
    },
  });
  ConnectImage.associate = (db) => {
    db.ConnectImage.belongsTo(db.Connect, {
      foreignKey: "connectId",
    }); // 한개의 이미지는 여러커플을 가질수없다. 1:N
  };
  return ConnectImage;
};
