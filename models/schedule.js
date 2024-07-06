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
    sticker: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
  Schedule.associate = (db) => {
    db.Schedule.belongsTo(db.User); // schedule은 어떤 user에게 속해있다. 1:N
  };
  return Schedule;
};
