const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      first: {
        type: String,
        required: [true, 'First name is required'],
        minlength: [2, 'First name must be at least 2 characters'],
        maxlength: [256, 'First name cannot exceed 256 characters'],
      },
      middle: {
        type: String,
        maxlength: [256, 'Middle name cannot exceed 256 characters'],
        default: '',
      },
      last: {
        type: String,
        required: [true, 'Last name is required'],
        minlength: [2, 'Last name must be at least 2 characters'],
        maxlength: [256, 'Last name cannot exceed 256 characters'],
      },
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^0[2-9]\d{7,8}$/, 'Please provide a valid Israeli phone number'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
      ],
    },
    image: {
      url: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      },
      alt: {
        type: String,
        default: 'User profile image',
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
    isBusiness: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
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

// Method to check if entered password matches the hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
  // Only hash the password if it's modified (or new)
  if (!this.isModified('password')) {
    next();
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User; 