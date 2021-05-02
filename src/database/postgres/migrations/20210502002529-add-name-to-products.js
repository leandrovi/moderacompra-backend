'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('products', 'name', {
      type: Sequelize.STRING,
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('products', 'name', {
      type: Sequelize.STRING,
      unique: false
    });
  }
};
