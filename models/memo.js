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
  Memo.associate = (db) => {
    db.Memo.belongsTo(db.User); // memo는 어떤 user에게 속해있다. 1:N
  };
  return Memo;
};
