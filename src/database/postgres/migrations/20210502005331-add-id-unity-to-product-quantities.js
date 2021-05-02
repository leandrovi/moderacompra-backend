'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('product_quantities', 'id_unity', {
      type: Sequelize.STRING,
      allowNull: true,
      references: { model: 'unities', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('product_quantities', 'id_unity');
  }
};
