'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      projects.belongsTo(models.hiring, {
        as : "hiring",
        foreignKey: {
          name: 'hiringId'
        }
      });

      projects.hasMany(models.project_photos, {
        as : "photos",
      });
    }
  };
  projects.init({
    hiringId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    projectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'projects',
  });
  return projects;
};