'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('product_quantities', 'initial_quantity', {
      type: Sequelize.DECIMAL,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('product_quantities', 'initial_quantity', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  }
};
