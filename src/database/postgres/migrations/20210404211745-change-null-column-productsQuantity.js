'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('products_quantity', 'final_quantity', {
        allowNull: true,
        type: Sequelize.INTEGER
      }),
      queryInterface.changeColumn('products_quantity', 'suggestion_quantity', {
        allowNull: true,
        type: Sequelize.INTEGER
      }),
      queryInterface.changeColumn('products_quantity', 'local_price', {
        allowNull: true,
        type: Sequelize.INTEGER
      })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('products_quantity', 'final_quantity', {
        allowNull: false,
        type: Sequelize.INTEGER
      }),
      queryInterface.changeColumn('products_quantity', 'suggestion_quantity', {
        allowNull: false,
        type: Sequelize.INTEGER
      }),
      queryInterface.changeColumn('products_quantity', 'local_price', {
        allowNull: false,
        type: Sequelize.INTEGER
      })
    ]);
  }
};
