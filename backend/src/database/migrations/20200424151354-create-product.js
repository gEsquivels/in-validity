'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false 
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      validity: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      price: {
        type: Sequelize.REAL,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lot: {
        type: Sequelize.STRING,
        allowNull: true
      },
      type_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'types', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      store_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'stores', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('products');
  }
};
