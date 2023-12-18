module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define("Schedule", {
    // id:{}, mysql에 기본적으로 들어있다.
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    memo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Schedule.associate = (db) => {};
  return Schedule;
};
