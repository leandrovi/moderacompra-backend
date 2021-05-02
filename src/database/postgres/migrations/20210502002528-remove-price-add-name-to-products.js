'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('products', 'price'),
      queryInterface.changeColumn('products', 'name', {
        type: Sequelize.STRING,
        unique: true,
      }),
      queryInterface.addConstraint('products', {
        type: 'UNIQUE',
        fields: ['name'],
        name: 'unique_name'
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeConstraint('products', 'unique_name'),
      queryInterface.changeColumn('products', 'name', {
        type: Sequelize.STRING,
        unique: false
      }),
      queryInterface.addColumn('products', 'price', {
        type: Sequelize.INTEGER,
        allowNull: true,
      })
    ])
  }
};
