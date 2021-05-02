'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('products', {
      type: 'UNIQUE',
      fields: ['name'],
      name: 'unique_name'
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('products', 'unique_name')
  }
};
