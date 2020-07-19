'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('movies', {

            movieId: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
            },
            movieName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            castAndCrew: {
                allowNull: false,
                type: Sequelize.JSON,
            },
            director: {
                type: Sequelize.STRING,
                allowNull: false,
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
        return queryInterface.dropTable('movies');
    }
};
