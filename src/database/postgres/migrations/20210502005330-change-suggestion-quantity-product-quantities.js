'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('product_quantities', 'suggestion_quantity', {
      type: Sequelize.DECIMAL,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('product_quantities', 'suggestion_quantity', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  }
};
