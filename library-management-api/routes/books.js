const express = require('express');
const router = express.Router();
const { bookValidation } = require('../middleware/validation');
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/booksController');

// GET all books
router.get('/', getAllBooks);

// GET single book by ID
router.get('/:id', getBookById);

// POST create new book
router.post('/', bookValidation, createBook);

// PUT update book
router.put('/:id', bookValidation, updateBook);

// DELETE book
router.delete('/:id', deleteBook);

module.exports = router;