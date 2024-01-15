"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "moodEmoji", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Users", "moodColor", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
