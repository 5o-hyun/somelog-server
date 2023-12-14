module.exports = (sequelize, DataTypes) => {
  const Connect = sequelize.define(
    "Connect",
    {
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Y", // 기본값
      },
    },
    { freezeTableName: true } // 테이블이름 s안붙이기
  );

  return Connect;
};
