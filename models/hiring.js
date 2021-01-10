'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hiring extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      hiring.belongsTo(models.users, {
        as: "orderBy",
        foreignKey: {
          name: 'hiringBy'
        }
      });
      hiring.belongsTo(models.users, {
        as: "orderTo",
        foreignKey: {
          name: 'hiringTo'
        }
      });
      hiring.hasOne(models.projects, {
        as : "projects",
      });
    }
  };
  hiring.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    price: DataTypes.INTEGER,
    hiringBy: DataTypes.INTEGER,
    hiringTo: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'hiring',
  });
  return hiring;
};