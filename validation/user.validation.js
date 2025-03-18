const Joi = require('joi');

// Register validation schema
const registerValidation = Joi.object({
  name: Joi.object({
    first: Joi.string().min(2).max(256).required().messages({
      'string.min': 'First name must be at least 2 characters',
      'string.max': 'First name cannot exceed 256 characters',
      'any.required': 'First name is required',
    }),
    middle: Joi.string().max(256).allow('').messages({
      'string.max': 'Middle name cannot exceed 256 characters',
    }),
    last: Joi.string().min(2).max(256).required().messages({
      'string.min': 'Last name must be at least 2 characters',
      'string.max': 'Last name cannot exceed 256 characters',
      'any.required': 'Last name is required',
    }),
  }).required(),
  
  phone: Joi.string().pattern(/^0[2-9]\d{7,8}$/).required().messages({
    'string.pattern.base': 'Please provide a valid Israeli phone number',
    'any.required': 'Phone number is required',
  }),
  
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'any.required': 'Email is required',
  }),
  
  password: Joi.string()
    .min(6)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
      'any.required': 'Password is required',
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
  
  isBusiness: Joi.boolean(),
  isAdmin: Joi.boolean(),
});

// Login validation schema
const loginValidation = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'any.required': 'Email is required',
  }),
  
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
  }),
});

// Update user validation schema
const updateUserValidation = Joi.object({
  name: Joi.object({
    first: Joi.string().min(2).max(256).required().messages({
      'string.min': 'First name must be at least 2 characters',
      'string.max': 'First name cannot exceed 256 characters',
      'any.required': 'First name is required',
    }),
    middle: Joi.string().max(256).allow('').messages({
      'string.max': 'Middle name cannot exceed 256 characters',
    }),
    last: Joi.string().min(2).max(256).required().messages({
      'string.min': 'Last name must be at least 2 characters',
      'string.max': 'Last name cannot exceed 256 characters',
      'any.required': 'Last name is required',
    }),
  }).required(),
  
  phone: Joi.string().pattern(/^0[2-9]\d{7,8}$/).required().messages({
    'string.pattern.base': 'Please provide a valid Israeli phone number',
    'any.required': 'Phone number is required',
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

// Update business status validation schema
const updateBusinessStatusValidation = Joi.object({
  isBusiness: Joi.boolean().required().messages({
    'any.required': 'Business status is required',
  }),
});

module.exports = {
  registerValidation,
  loginValidation,
  updateUserValidation,
  updateBusinessStatusValidation,
}; 