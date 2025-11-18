const Joi = require('joi');

// Task validation schema
const taskSchema = Joi.object({
  title: Joi.string().min(1).max(100).required().messages({
    'string.empty': 'Task title is required',
    'string.max': 'Title cannot exceed 100 characters',
    'any.required': 'Task title is required'
  }),
  description: Joi.string().max(500).allow('').optional(),
  status: Joi.string().valid('todo', 'in-progress', 'completed').optional(),
  priority: Joi.string().valid('low', 'medium', 'high').optional(),
  dueDate: Joi.date().min('now').optional().messages({
    'date.min': 'Due date must be in the future'
  }),
  tags: Joi.array().items(Joi.string().max(20)).optional(),
  estimatedHours: Joi.number().min(0).max(1000).optional()
});

// Team validation schema
const teamSchema = Joi.object({
  name: Joi.string().min(1).max(50).required().messages({
    'string.empty': 'Team name is required',
    'string.max': 'Team name cannot exceed 50 characters',
    'any.required': 'Team name is required'
  }),
  description: Joi.string().max(200).allow('').optional(),
  department: Joi.string().max(50).allow('').optional()
});

// Validation middleware
const validateTask = (req, res, next) => {
  const { error } = taskSchema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const errorMessages = error.details.map(detail => detail.message);
    return res.status(400).json({
      error: 'Validation failed',
      details: errorMessages
    });
  }
  
  next();
};

const validateTeam = (req, res, next) => {
  const { error } = teamSchema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const errorMessages = error.details.map(detail => detail.message);
    return res.status(400).json({
      error: 'Validation failed',
      details: errorMessages
    });
  }
  
  next();
};

module.exports = {
  validateTask,
  validateTeam
};