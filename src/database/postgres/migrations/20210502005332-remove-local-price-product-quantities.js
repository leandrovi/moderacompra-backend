'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('product_quantities', 'local_price');
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('product_quantities', 'local_price', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  }
};
