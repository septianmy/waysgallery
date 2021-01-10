'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project_photos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      project_photos.belongsTo(models.projects, {
        as : "projects",
        foreignKey: {
          name: 'projectId'
        }
      });
    }
  };
  project_photos.init({
    projectId: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'project_photos',
  });
  return project_photos;
};