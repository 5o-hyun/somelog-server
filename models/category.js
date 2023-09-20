module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    // id:{}, mysql에 기본적으로 들어있다.
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Category.associate = (db) => {};
  return Category;
};
