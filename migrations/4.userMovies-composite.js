'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex(
      'userMovies',
      ['userId', 'movieId', 'preference'],
      {
        indexName: 'userMovies_compositekey',
        indicesType: 'UNIQUE'
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex(
      'userMovies_compositekey'
    );
  }
};
