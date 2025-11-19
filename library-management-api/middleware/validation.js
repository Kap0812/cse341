const { body } = require('express-validator');

const bookValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 1, max: 200 }).withMessage('Title must be between 1 and 200 characters'),
  
  body('author')
    .trim()
    .notEmpty().withMessage('Author is required')
    .isLength({ min: 1, max: 100 }).withMessage('Author must be between 1 and 100 characters'),
  
  body('isbn')
    .trim()
    .notEmpty().withMessage('ISBN is required')
    .matches(/^(?:\d{10}|\d{13})$/).withMessage('ISBN must be 10 or 13 digits'),
  
  body('publishYear')
    .isInt({ min: 1000, max: new Date().getFullYear() + 1 })
    .withMessage(`Publish year must be between 1000 and ${new Date().getFullYear() + 1}`),
  
  body('genre')
    .trim()
    .notEmpty().withMessage('Genre is required')
    .isLength({ min: 1, max: 50 }).withMessage('Genre must be between 1 and 50 characters'),
  
  body('pages')
    .isInt({ min: 1 }).withMessage('Pages must be a positive integer'),
  
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),
  
  body('available')
    .optional()
    .isBoolean().withMessage('Available must be a boolean')
];

const authorValidation = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 1, max: 50 }).withMessage('First name must be between 1 and 50 characters'),
  
  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ min: 1, max: 50 }).withMessage('Last name must be between 1 and 50 characters'),
  
  body('biography')
    .trim()
    .notEmpty().withMessage('Biography is required')
    .isLength({ min: 20, max: 2000 }).withMessage('Biography must be between 20 and 2000 characters'),
  
  body('birthDate')
    .notEmpty().withMessage('Birth date is required')
    .isISO8601().withMessage('Birth date must be a valid date (YYYY-MM-DD)'),
  
  body('nationality')
    .trim()
    .notEmpty().withMessage('Nationality is required')
    .isLength({ min: 2, max: 50 }).withMessage('Nationality must be between 2 and 50 characters')
];

module.exports = {
  bookValidation,
  authorValidation
};