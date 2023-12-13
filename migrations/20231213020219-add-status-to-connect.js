"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Connect", "status", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "Y", // 기본값 설정
    });
  },

  async down(queryInterface, Sequelize) {},
};
