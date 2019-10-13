const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      res.status(500).send(error);
    }
  }
}

// Get /books request that shows the full list of books
router.get('/books', asyncHandler(async (req, res) => {
  let books = await Book.findAll();
  if (books) {
    res.render('index', { books });
  } else {
    res.render('page-not-found');
  }
}));

module.exports = books;