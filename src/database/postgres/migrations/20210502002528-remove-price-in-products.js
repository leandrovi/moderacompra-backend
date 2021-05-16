'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('products', 'price');
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('products', 'price', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  }
};
