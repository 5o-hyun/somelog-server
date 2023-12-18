module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define("Color", {
    // id:{}, mysql에 기본적으로 들어있다.
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Color.associate = (db) => {};
  return Color;
};
