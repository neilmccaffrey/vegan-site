import { useState, useEffect } from 'react';
import axios from 'axios';

const Recipes = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState('');

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

  return (
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
      <h1>Recipe List</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recipes;
