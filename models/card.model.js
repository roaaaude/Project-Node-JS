const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: [2, 'Title must be at least 2 characters'],
      maxlength: [256, 'Title cannot exceed 256 characters'],
    },
    subtitle: {
      type: String,
      required: [true, 'Subtitle is required'],
      minlength: [2, 'Subtitle must be at least 2 characters'],
      maxlength: [256, 'Subtitle cannot exceed 256 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [2, 'Description must be at least 2 characters'],
      maxlength: [1024, 'Description cannot exceed 1024 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^0[2-9]\d{7,8}$/, 'Please provide a valid Israeli phone number'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        'Please provide a valid email',
      ],
    },
    web: {
      type: String,
      match: [
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        'Please provide a valid URL',
      ],
    },
    image: {
      url: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg',
      },
      alt: {
        type: String,
        default: 'Business card image',
      },
    },
    address: {
      state: {
        type: String,
        default: '',
      },
      country: {
        type: String,
        required: [true, 'Country is required'],
      },
      city: {
        type: String,
        required: [true, 'City is required'],
      },
      street: {
        type: String,
        required: [true, 'Street is required'],
      },
      houseNumber: {
        type: Number,
        required: [true, 'House number is required'],
      },
      zip: {
        type: Number,
        default: 0,
      },
    },
    bizNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Card = mongoose.model('Card', cardSchema);

module.exports = Card; 