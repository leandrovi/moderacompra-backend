'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('product_quantities', 'initial_quantity', {
        type: Sequelize.DECIMAL,
        allowNull: false,
      }),
      queryInterface.changeColumn('product_quantities', 'final_quantity', {
        type: Sequelize.DECIMAL,
        allowNull: true,
      }),
      queryInterface.changeColumn('product_quantities', 'suggestion_quantity', {
        type: Sequelize.DECIMAL,
        allowNull: true,
      }),
      queryInterface.addColumn('product_quantities', 'id_unity', {
        type: Sequelize.STRING,
        allowNull: true,
        references: { model: 'unities', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        unique: true,
      }),
      queryInterface.removeColumn('product_quantities', 'local_price'),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('product_quantities', 'local_price', {
        type: Sequelize.INTEGER,
        allowNull: true
      }),
      queryInterface.removeColumn('product_quantities', 'id_unity'),
      queryInterface.changeColumn('product_quantities', 'suggestion_quantity', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.changeColumn('product_quantities', 'final_quantity', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.changeColumn('product_quantities', 'initial_quantity', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
    ])
  }
};
