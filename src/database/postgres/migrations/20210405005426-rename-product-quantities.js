'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.renameTable('products_quantity', 'product_quantities')
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.renameTable('product_quantities', 'products_quantity')
  }
};
