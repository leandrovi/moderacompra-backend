'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true
      },
      name: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('products')
  }
};
