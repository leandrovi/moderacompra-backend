'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('lists', 'month'),
      queryInterface.removeColumn('lists', 'day'),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('lists', 'month', {
        type: Sequelize.INTEGER,
        allowNull: true
      }),
      queryInterface.addColumn('lists', 'day', {
        type: Sequelize.INTEGER,
        allowNull: true
      }),
    ]);
  }
};
