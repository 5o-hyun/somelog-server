module.exports = (sequelize, DataTypes) => {
  const Memo = sequelize.define("Memo", {
    // id:{}, mysql에 기본적으로 들어있다.
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Memo.associate = (db) => {};
  return Memo;
};
