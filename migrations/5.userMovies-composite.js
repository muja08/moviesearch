'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex(
      'userMovies',
      ['userId', 'movieId'],
      {
        indexName: 'userMovies_compositekey_2',
        indicesType: 'UNIQUE'
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex(
      'userMovies_compositekey_2'
    );
  }
};
