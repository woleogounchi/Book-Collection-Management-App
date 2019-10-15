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
      sequelize
    }
  );

  return Book;
};