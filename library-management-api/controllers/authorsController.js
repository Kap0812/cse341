const { ObjectId } = require('mongodb');
const { getDB } = require('../db/connection');
const { validationResult } = require('express-validator');

// Get all authors
const getAllAuthors = async (req, res) => {
  try {
    const db = getDB();
    const authors = await db.collection('authors').find().toArray();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve authors', details: err.message });
  }
};

// Get single author by ID
const getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid author ID format' });
    }

    const db = getDB();
    const author = await db.collection('authors').findOne({ _id: new ObjectId(id) });
    
    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }
    
    res.json(author);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve author', details: err.message });
  }
};

// Create new author
const createAuthor = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const db = getDB();
    const authorData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      biography: req.body.biography,
      birthDate: req.body.birthDate,
      nationality: req.body.nationality,
      createdAt: new Date()
    };

    const result = await db.collection('authors').insertOne(authorData);
    
    res.status(201).json({
      message: 'Author created successfully',
      authorId: result.insertedId
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create author', details: err.message });
  }
};

// Update author
const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid author ID format' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const db = getDB();
    const updateData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      biography: req.body.biography,
      birthDate: req.body.birthDate,
      nationality: req.body.nationality,
      updatedAt: new Date()
    };

    const result = await db.collection('authors').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.json({ message: 'Author updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update author', details: err.message });
  }
};

// Delete author
const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid author ID format' });
    }

    const db = getDB();
    const result = await db.collection('authors').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.json({ message: 'Author deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete author', details: err.message });
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};