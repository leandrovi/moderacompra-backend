'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('status', [{
      id: 1,
      description: 'pendente'
    }, {
      id: 2,
      description: 'em aberto',
    }, {
      id: 3,
      description: 'finalizada'
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('status', null, {})
  }
};
