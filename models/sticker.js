module.exports = (sequelize, DataTypes) => {
  const Sticker = sequelize.define("Sticker", {
    // id:{}, mysql에 기본적으로 들어있다.
    imagePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Sticker.associate = (db) => {
    db.Sticker.hasMany(db.Celebration); // 스티커는 여러개의 기념일을 가진다 1:N
  };
  return Sticker;
};
