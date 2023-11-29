module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    // id:{}, mysql에 기본적으로 들어있다.
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pw: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthday: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true, // true : 선택적 ,false : 필수
      unique: true, // 고유한값
    },
  });
  User.associate = (db) => {};
  return User;
};
