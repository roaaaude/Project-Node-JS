const Joi = require('joi');

// Create card validation schema
const createCardValidation = Joi.object({
  title: Joi.string().min(2).max(256).required().messages({
    'string.min': 'Title must be at least 2 characters',
    'string.max': 'Title cannot exceed 256 characters',
    'any.required': 'Title is required',
  }),
  
  subtitle: Joi.string().min(2).max(256).required().messages({
    'string.min': 'Subtitle must be at least 2 characters',
    'string.max': 'Subtitle cannot exceed 256 characters',
    'any.required': 'Subtitle is required',
  }),
  
  description: Joi.string().min(2).max(1024).required().messages({
    'string.min': 'Description must be at least 2 characters',
    'string.max': 'Description cannot exceed 1024 characters',
    'any.required': 'Description is required',
  }),
  
  phone: Joi.string().pattern(/^0[2-9]\d{7,8}$/).required().messages({
    'string.pattern.base': 'Please provide a valid Israeli phone number',
    'any.required': 'Phone number is required',
  }),
  
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'any.required': 'Email is required',
  }),
  
  web: Joi.string().uri().allow('').messages({
    'string.uri': 'Please provide a valid URL',
  }),
  
  image: Joi.object({
    url: Joi.string().uri().allow(''),
    alt: Joi.string().allow(''),
  }),
  
  address: Joi.object({
    state: Joi.string().allow(''),
    country: Joi.string().required().messages({
      'any.required': 'Country is required',
    }),
    city: Joi.string().required().messages({
      'any.required': 'City is required',
    }),
    street: Joi.string().required().messages({
      'any.required': 'Street is required',
    }),
    houseNumber: Joi.number().required().messages({
      'any.required': 'House number is required',
    }),
    zip: Joi.number(),
  }).required(),
});

// Update card validation schema (same as create)
const updateCardValidation = createCardValidation;

module.exports = {
  createCardValidation,
  updateCardValidation,
}; 