const mongoose = require('mongoose');
const Recipe = require('../models/recipeModel');

// @desc    Create a new recipe
// @route   POST /api/recipes
// @access  Public
const createRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Recipe created successfully',
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Retrieve all recipes
// @route   GET /api/recipes
// @access  Public
const getAllRecipes = async (req, res, next) => {
  try {
    const { cuisine, difficulty, search } = req.query;
    const filter = {};

    if (cuisine) filter.cuisine = cuisine;
    if (difficulty) filter.difficulty = difficulty;
    if (search) filter.title = { $regex: search, $options: 'i' };

    const recipes = await Recipe.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Retrieve a single recipe by ID
// @route   GET /api/recipes/:id
// @access  Public
const getRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid recipe ID format',
      });
    }

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: `Recipe with ID ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a recipe by ID
// @route   PUT /api/recipes/:id
// @access  Public
const updateRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid recipe ID format',
      });
    }

    const recipe = await Recipe.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: `Recipe with ID ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Recipe updated successfully',
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a recipe by ID
// @route   DELETE /api/recipes/:id
// @access  Public
const deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid recipe ID format',
      });
    }

    const recipe = await Recipe.findByIdAndDelete(id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: `Recipe with ID ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Recipe deleted successfully',
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
