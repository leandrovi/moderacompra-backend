'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    Promise.all([
      queryInterface.addColumn('products', 'created_at', {
        allowNull: false,
        type: Sequelize.DATE
      }),
      queryInterface.addColumn('products', 'updated_at', {
        allowNull: false,
        type: Sequelize.DATE
      }),
      queryInterface.addColumn('products_quantity', 'created_at', {
        allowNull: false,
        type: Sequelize.DATE
      }),
      queryInterface.addColumn('products_quantity', 'updated_at', {
        allowNull: false,
        type: Sequelize.DATE
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    Promise.all([
      queryInterface.removeColumn('products', 'created_at'),
      queryInterface.removeColumn('products', 'updated_at'),
      queryInterface.removeColumn('products_quantity', 'created_at'),
      queryInterface.removeColumn('products_quantity', 'updated_at')
    ])
  }
};
