const { ObjectId } = require('mongodb');
const { getDB } = require('../db/connection');
const { validationResult } = require('express-validator');

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const db = getDB();
    const books = await db.collection('books').find().toArray();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve books', details: err.message });
  }
};

// Get single book by ID
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid book ID format' });
    }

    const db = getDB();
    const book = await db.collection('books').findOne({ _id: new ObjectId(id) });
    
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve book', details: err.message });
  }
};

// Create new book
const createBook = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const db = getDB();
    const bookData = {
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
      publishYear: req.body.publishYear,
      genre: req.body.genre,
      pages: req.body.pages,
      description: req.body.description,
      available: req.body.available !== undefined ? req.body.available : true,
      createdAt: new Date()
    };

    const result = await db.collection('books').insertOne(bookData);
    
    res.status(201).json({
      message: 'Book created successfully',
      bookId: result.insertedId
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create book', details: err.message });
  }
};

// Update book
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid book ID format' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const db = getDB();
    const updateData = {
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
      publishYear: req.body.publishYear,
      genre: req.body.genre,
      pages: req.body.pages,
      description: req.body.description,
      available: req.body.available,
      updatedAt: new Date()
    };

    const result = await db.collection('books').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ message: 'Book updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update book', details: err.message });
  }
};

// Delete book
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid book ID format' });
    }

    const db = getDB();
    const result = await db.collection('books').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete book', details: err.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};