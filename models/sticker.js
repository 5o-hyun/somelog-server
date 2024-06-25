module.exports = (sequelize, DataTypes) => {
  const Sticker = sequelize.define("Sticker", {
    // id:{}, mysql에 기본적으로 들어있다.
    imagePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Sticker;
};
