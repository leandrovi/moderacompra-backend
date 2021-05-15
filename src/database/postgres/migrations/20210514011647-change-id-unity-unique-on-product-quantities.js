'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('product_quantities', 'id_unity', {
        type: Sequelize.STRING,
        allowNull: true,
        references: { model: 'unities', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        unique: false,
      }),
      queryInterface.removeConstraint('product_quantities', 'product_quantities_id_unity_key'),
      queryInterface.removeConstraint('product_quantities', 'products_quantity_product_id_key'),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addConstraint('product_quantities', {
        type: 'UNIQUE',
        fields: ['product_id'],
        name: 'products_quantity_product_id_key'
      }),
      queryInterface.addConstraint('product_quantities', {
        type: 'UNIQUE',
        fields: ['id_unity'],
        name: 'product_quantities_id_unity_key'
      }),
      queryInterface.changeColumn('product_quantities', 'id_unity', {
        type: Sequelize.STRING,
        allowNull: true,
        references: { model: 'unities', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        unique: true,
      })
    ])
  }
};
