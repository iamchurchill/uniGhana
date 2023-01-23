require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_DEVELOPMENT_USER,
    password: process.env.DB_DEVELOPMENT_PASSWORD,
    database: process.env.DB_DEVELOPMENT,
    host: process.env.DB_DEVELOPMENT_HOST,
    port: parseInt(process.env.DB_DEVELOPMENT_PORT || "8888"),
    dialect: process.env.DB_DEVELOPMENT_DIALECT,
    dialectOptions: {
      bigNumberStrings: true,
    },
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeData",
    migrationStorageTableName: "SequelizeMeta",
  },
  test: {
    username: process.env.DB_TEST_USER,
    password: process.env.DB_TEST_PASSWORD,
    database: process.env.DB_TEST,
    host: process.env.DB_TEST_HOST,
    port: parseInt(process.env.DB_TEST_PORT || "8888"),
    dialect: process.env.DB_TEST_DIALECT,
    dialectOptions: {
      bigNumberStrings: true,
    },
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeData",
    migrationStorageTableName: "SequelizeMeta",
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "8888"),
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      bigNumberStrings: true,
    },
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeData",
    migrationStorageTableName: "SequelizeMeta",
  },
};
