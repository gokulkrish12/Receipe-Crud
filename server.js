const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const recipeRoutes = require('./routes/recipeRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the Recipes API',
    endpoints: {
      createRecipe: 'POST   /api/recipes',
      getAllRecipes: 'GET    /api/recipes',
      getRecipeById: 'GET    /api/recipes/:id',
      updateRecipe: 'PUT    /api/recipes/:id',
      deleteRecipe: 'DELETE /api/recipes/:id',
    },
  });
});

app.use('/api/recipes', recipeRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
  );
});
