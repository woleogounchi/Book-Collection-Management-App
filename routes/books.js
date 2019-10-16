// Require express
const express = require('express');
const router = express.Router();

// Book model
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
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll({ order: [["createdAt", "DESC"]] });
  res.render('index', { books, title: "My Library" });
}))

// Get /books/new that creates a new book form
router.get('/new', (req, res) => {
  res.render("new-book", { title: "New Book" });
});

module.exports = router;