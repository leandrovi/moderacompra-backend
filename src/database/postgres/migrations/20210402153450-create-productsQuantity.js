'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('products_quantity', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true
      },
      list_id: {
        allowNull: false,
        references: { model: 'lists', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        type: Sequelize.STRING
        
      },
      product_id: {
        allowNull: false,
        references: { model: 'products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        unique: true,
        type: Sequelize.STRING
      },
      initial_quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      final_quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      suggestion_quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      local_price: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('products_quantity')
  }
};
