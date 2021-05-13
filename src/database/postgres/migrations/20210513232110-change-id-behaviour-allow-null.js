'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('users', 'id_behaviour', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('product_quantities', 'id_behaviour', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
