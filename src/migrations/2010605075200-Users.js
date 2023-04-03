'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      userType: {
        type: Sequelize.ENUM('corporate', 'private', 'visitor'),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }

    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user')
  }
}
