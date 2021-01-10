'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class arts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      arts.belongsTo(models.users, {
        as : "arts",
        foreignKey: {
          name: 'userId'
        }
      });

    }
  };
  arts.init({
    image: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'arts',
  });
  return arts;
};