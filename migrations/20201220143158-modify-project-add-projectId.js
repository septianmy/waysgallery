'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('projects', 'projectId', Sequelize.INTEGER);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('projects', 'projectId', Sequelize.INTEGER);
  }
};
