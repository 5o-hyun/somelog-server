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
    code: {
      type: DataTypes.STRING,
      allowNull: true, // true : 선택적 ,false : 필수
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthday: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  User.associate = (db) => {
    // 코드를 받은사람
    db.User.belongsToMany(db.User, {
      through: "Connect",
      as: "Connected",
      foreignKey: "ConnectedId",
    });
    // 코드를 보낸사람
    db.User.belongsToMany(db.User, {
      through: "Connect",
      as: "Connecter",
      foreignKey: "ConnecterId",
    });
    db.User.hasMany(db.Schedule); // user는 schedule을 여러개 가질수있다. 1:N
    db.User.hasMany(db.Memo); // user는 memo를 여러개 가질수있다. 1:N
  };

  return User;
};
