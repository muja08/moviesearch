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
            createdAt: {
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE(3),
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
                allowNull: false,
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
