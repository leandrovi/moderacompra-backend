'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable('unities', {
            id: {
                type: Sequelize.STRING,
                primaryKey: true,
                unique: true
            },
            description: {
                type: Sequelize.STRING,
                allowNull: true
            }
        })
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable('unities')
    }
};
