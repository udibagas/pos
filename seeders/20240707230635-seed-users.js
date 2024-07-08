"use strict";

const { hashSync } = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "Admin",
        email: "admin@mail.com",
        password: hashSync("rahasia"),
        role: "ADMIN",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "Users",
      {},
      {
        truncate: true,
        cascade: true,
        restartIdentity: true,
      }
    );
  },
};
