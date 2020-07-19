'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('userMovies', {

            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: "users",
                    key: "userId",
                },
            },
            movieId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: "movies",
                    key: "movieId",
                },
            },
            preference: {
                allowNull: false,
                type: Sequelize.INTEGER,
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
        return queryInterface.dropTable('userMovies');
    }
};
