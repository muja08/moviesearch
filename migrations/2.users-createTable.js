'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {

            userId: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
            },
            userName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            relationship: {
                type: Sequelize.STRING,
                defaultValue: null,
                allowNull: true,
            },
            age: {
                allowNull: true,
                type: Sequelize.INTEGER,
                defaultValue: null
            },
            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true,
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users');
    }
};
