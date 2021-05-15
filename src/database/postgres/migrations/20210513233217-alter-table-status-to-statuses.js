'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.renameTable('status', 'statuses');
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.renameTable('statuses', 'status');
  }
};
