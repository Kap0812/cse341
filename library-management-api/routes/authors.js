const express = require('express');
const router = express.Router();
const { authorValidation } = require('../middleware/validation');
const {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
} = require('../controllers/authorsController');

// GET all authors
router.get('/', getAllAuthors);

// GET single author by ID
router.get('/:id', getAuthorById);

// POST create new author
router.post('/', authorValidation, createAuthor);

// PUT update author
router.put('/:id', authorValidation, updateAuthor);

// DELETE author
router.delete('/:id', deleteAuthor);

module.exports = router;