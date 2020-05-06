'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('types', [{
      name: 'Grãos',
      description: 'Materiais secos'
    },
    {
      name: 'Frios',
      description: 'Materiais com alto risco de validade'
    },
    {
      name: 'Limpeza',
      description: 'Materiais quimicos ultilizados para limpeza'
    },
    {
      name: 'Bebidas',
      description: 'Materiais liquidos'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('types', null, {});
  }
};
