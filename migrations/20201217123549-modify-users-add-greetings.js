'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'greeting', Sequelize.TEXT);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'greeting', Sequelize.TEXT);
  }
};
