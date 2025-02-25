import { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeModal from '../components/RecipeModal';

const Recipes = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null); // selected recipe to show details

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/recipes')
      .then((response) => setAllRecipes(response.data))
      .catch((error) => console.error('Error fetching recipes:', error));
  }, []);

  // show recipes based on category
  useEffect(() => {
    if (category === 'All') {
      setRecipes(allRecipes);
    } else {
      setRecipes(allRecipes.filter((recipe) => recipe.category === category));
    }
  }, [category]);

  // set selected recipie onclick to show details
  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    document.body.style.overflow = 'hidden'; // Disable scroll when modal is open
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
    document.body.style.overflow = 'auto'; // Re-enable scroll when modal is closed
  };

  return (
    <div className="flex flex-col md:flex-row mt-20 ml-5">
      <div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="primary rounded p-2 shadow-md cursor-pointer"
        >
          <option value="">Select Category</option>
          <option value="All">All</option>
          <option value="Mexican">Mexican</option>
          <option value="Italian">Italian</option>
          <option value="American">American</option>
          {/* Add more categories here */}
        </select>
        <ul>
          {recipes.map((recipe) => (
            <li
              key={recipe.id}
              onClick={() => handleRecipeClick(recipe)}
              className="cursor-pointer underline hover:"
            >
              {recipe.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Conditionally render recipe details if one is selected */}
      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Recipes;
