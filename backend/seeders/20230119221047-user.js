"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "ama@gmail.com",
          password:
            "$2a$12$XfoiRB9NtelZvjOgfDcioOc0uTLA9aJj5ICH2D8qPWgBeU.KImlRG",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: "kwame@gmail.com",
          password:
            "$2a$12$XfoiRB9NtelZvjOgfDcioOc0uTLA9aJj5ICH2D8qPWgBeU.KImlRG",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: "emerald@gmail.com",
          password:
            "$2a$12$XfoiRB9NtelZvjOgfDcioOc0uTLA9aJj5ICH2D8qPWgBeU.KImlRG",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: "friedrich@gmail.com",
          password:
            "$2a$12$XfoiRB9NtelZvjOgfDcioOc0uTLA9aJj5ICH2D8qPWgBeU.KImlRG",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: "adolf@gmail.com",
          password:
            "$2a$12$XfoiRB9NtelZvjOgfDcioOc0uTLA9aJj5ICH2D8qPWgBeU.KImlRG",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
