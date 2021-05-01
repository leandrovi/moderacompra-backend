'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable('status', {
            id: {
                type: Sequelize.INTEGER,
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
        return queryInterface.dropTable('status')
    }
};
