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

// Get /books/new request that creates a new book form
router.get('/new', (req, res) => {
  res.render("new-book", { title: "New Book" });
});

// Post /books/new request that posts a new book to the database
router.post('/new', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect("/books");
  } catch (error) {
    if(error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      const bookData = {
        pageTitle: "New Book", 
        book: book.dataValues, 
        errors: error.errors
      }
      res.render("new-book", bookData );
    } else {
      throw error;
    }  
  }
}));

// Get /books/:id request that shows book detail form
router.get("/:id", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    const bookData = {
      title: "Update Book", 
      id: book.dataValues.id, 
      book: book.dataValues
    };
    res.render("update-book", bookData);
  } else {
    res.status(404).render("page-not-found", { title: "Page Not Found" });
  }
}));

// Post /books/:id request that updates book info in the database
router.post('/:id', asyncHandler(async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if(book) {
      await book.update(req.body);
      res.redirect("/books");
    } else {
      res.status(404).render("page-not-found", { title: "Page Not Found" });
    }
  } catch (error) {
    if(error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      const bookData = {
        title: "Update Book", 
        id: book.dataValues.id, 
        book: book.dataValues,
        errors: error.errors
      };
      res.render("update-book", bookData)
    } else {
      throw error;
    }
  }
}));

// Get /books/:id/delete request that displays a book deletion form
router.get("/:id/delete", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    const bookData = { 
      title: "Delete Book", 
      book: book.dataValues 
    };
    res.render("delete", bookData);
  } else {
    res.status(404).render("page-not-found", { title: "Page Not Found" });
  }
}));

// Post /books/:id/delete request that deletes a book
router.post('/:id/delete', asyncHandler(async (req ,res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    await book.destroy();
    res.redirect("/books");
  } else {
    res.status(404).render("page-not-found", { title: "Page Not Found" });
  }
}));

module.exports = router;