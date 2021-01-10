'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class follows extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      follows.belongsTo(models.users, {
        as : "users",
        foreignKey: {
          name: 'followId'
        }
      });
    }
  };
  follows.init({
    userId: DataTypes.INTEGER,
    followId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'follows',
  });
  return follows;
};