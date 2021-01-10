'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('posts', 'userId', Sequelize.INTEGER);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('posts', 'userId', Sequelize.INTEGER);
  }
};
