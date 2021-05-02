'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('product_quantities', 'final_quantity', {
      type: Sequelize.DECIMAL,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('product_quantities', 'final_quantity', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  }
};
