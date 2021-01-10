'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.hasMany(models.posts, {
        as : "posts",
      });
      users.hasMany(models.arts, {
        as : "arts",
      });
    }
  };
  users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    avatar: DataTypes.STRING,
    greeting: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};