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

    toJSON() {
      return super.toJSON();
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "email should be unique",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("active", "inactive", "banned"),
        defaultValue: "active",
        allowNull: false,
      },
      refresh_token: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      createdAt: "created_at",
      updatedAt: "updated_at",
      underscored: true,
    }
  );
  return User;
};
