'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Users', {
      fields: ['email'],
      type: 'unique',
      name: 'users_email_unique'
    });
    await queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('Users', 'firstName', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('Users', 'lastName', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Users', 'users_email_unique');
    await queryInterface.changeColumn('Users', 'email', { type: Sequelize.STRING });
    await queryInterface.changeColumn('Users', 'password', { type: Sequelize.STRING });
    await queryInterface.changeColumn('Users', 'firstName', { type: Sequelize.STRING });
    await queryInterface.changeColumn('Users', 'lastName', { type: Sequelize.STRING });
  }
};
