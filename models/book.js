// We start be requiring the sequelize module
const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  class Book extends Sequelize.Model {}
  Book.init(
      {
      // We set our database properties each with their attributes
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false, // disallow null
        validate: {
          notNull: {
            msg: 'Please provide a value for "title"',
          },
          notEmpty: {
            // custom error message
            msg: 'Please provide a value for "title"',
          }
        },
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a value for "author"',
          },
          notEmpty: {
            msg: 'Please provide a value for "author"',
          }
        },
      },
      genre: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a value for "genre"',
          },
          notEmpty: {
            msg: 'Please provide a value for "genre"',
          }
        },
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a value for "year"',
          },
        },
      },
    },
    // Model options object 
    { 
      tableName: 'my_movies_table', // table name change to custom
      modelName: 'movie', // set model name to 'movie'; table name will be 'movies' instead of by default 'Movies'
      freezeTableName: true, // disable plural table names (Ex: change the table name from 'Movies' to 'Movie'.)
      timestamps: false, // disable timestamps
      paranoid: true, // enable "soft" deletes
      sequelize
    }
  );

  return Book;
};