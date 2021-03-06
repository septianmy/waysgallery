'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class photos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      photos.belongsTo(models.posts, {
        as : "posts",
        foreignKey: {
          name: 'postId'
        }
      });
    }
  };
  photos.init({
    image: DataTypes.STRING,
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'photos',
  });
  return photos;
};