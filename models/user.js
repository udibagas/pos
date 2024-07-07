"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Nama harus diisi" },
          notEmpty: { msg: "Nama harus diisi" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Email harus diisi" },
          notEmpty: { msg: "Email harus diisi" },
          isEmail: { msg: "Email tidak valid" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password harus diisi" },
          notEmpty: { msg: "Password harus diisi" },
          len: {
            args: [8, 20],
            msg: "Minimal password 8 karakter",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Role harus diisi" },
          notEmpty: { msg: "Role harus diisi" },
          isIn: {
            args: [["ADMIN", "KASIR"]],
            msg: "Role hanya boleh ADMIN atau KASIR",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
