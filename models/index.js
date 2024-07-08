"use strict";

const fs = require("fs");
const path = require("path");
const { Sequelize, Model } = require("sequelize");
const process = require("process");
const ValidationErrorException = require("../exceptions/ValidationErrorException");
const NotFoundException = require("../exceptions/NotFoundException");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.addHook("validationFailed", (instance, options, error) => {
  throw new ValidationErrorException(error);
});

// extending model
Model.findByPkOrFailed = async function (id) {
  const data = await this.findByPk(id);
  if (!data) throw new NotFoundException();
  return data;
};

Model.findOneOrFailed = async function (option) {
  const data = await this.findOne(option);
  if (!data) throw new NotFoundException();
  return data;
};

module.exports = db;
