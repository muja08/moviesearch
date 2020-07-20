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
