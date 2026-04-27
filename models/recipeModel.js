const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Recipe title is required'],
      trim: true,
      minlength: [2, 'Title must be at least 2 characters long'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Recipe description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    ingredients: {
      type: [String],
      required: [true, 'Ingredients are required'],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: 'At least one ingredient must be provided',
      },
    },
    instructions: {
      type: [String],
      required: [true, 'Instructions are required'],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: 'At least one instruction step must be provided',
      },
    },
    cuisine: {
      type: String,
      trim: true,
      default: 'Other',
    },
    prepTimeMinutes: {
      type: Number,
      min: [0, 'Preparation time cannot be negative'],
      default: 0,
    },
    cookTimeMinutes: {
      type: Number,
      min: [0, 'Cooking time cannot be negative'],
      default: 0,
    },
    servings: {
      type: Number,
      min: [1, 'Servings must be at least 1'],
      default: 1,
    },
    difficulty: {
      type: String,
      enum: {
        values: ['Easy', 'Medium', 'Hard'],
        message: 'Difficulty must be Easy, Medium, or Hard',
      },
      default: 'Medium',
    },
    author: {
      type: String,
      trim: true,
      default: 'Anonymous',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Recipe', recipeSchema);
