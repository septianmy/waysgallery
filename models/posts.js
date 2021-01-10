'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      posts.belongsTo(models.users, {
        as : "user",
        foreignKey: {
          name: 'createdBy'
        }
      });

      posts.hasMany(models.photos, {
        as : "photos",
      });
    }
  };
  posts.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    createdBy: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'posts',
  });
  return posts;
};