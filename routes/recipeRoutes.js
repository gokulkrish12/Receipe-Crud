const express = require('express');
const router = express.Router();
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipeController');

router.route('/').post(createRecipe).get(getAllRecipes);

router
  .route('/:id')
  .get(getRecipeById)
  .put(updateRecipe)
  .delete(deleteRecipe);

module.exports = router;
