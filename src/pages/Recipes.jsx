import { useState, useEffect } from 'react';
import RecipeModal from '../components/RecipeModal';
import RecipeForm from '../components/RecipeForm';
import { getRecipes } from '../api/recipes';

const Recipes = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null); // selected recipe to show details
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const fetchedRecipes = await getRecipes();
        setAllRecipes(fetchedRecipes);
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  // show recipes based on category
  useEffect(() => {
    if (category === 'All') {
      setRecipes([...allRecipes].sort((a, b) => a.name.localeCompare(b.name)));
    } else {
      setRecipes(
        allRecipes
          .filter((recipe) => recipe.category === category)
          .sort((a, b) => a.name.localeCompare(b.name))
      );
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

  const handleClick = () => {
    //show recipe form
    setShowForm(!showForm);
  };

  return (
    <>
      <title>Friendly Vegan | Vegan recipes</title>
      <meta
        name="description"
        content="Discover vegan and vegan-friendly recipes."
      />
      <meta
        name="keywords"
        content="vegan, plant-based, restaurants, food, healthy eating"
      />
      {/* <link rel="canonical" href="https://yourdomain.com/vegan-recipes" /> */}

      <div className="mt-20 ml-5">
        <span>
          To submit a recipe click{' '}
          <a onClick={handleClick} className="cursor-pointer underline">
            here!
          </a>
          {/* pass showForm state to close on submit */}
          {showForm && <RecipeForm setShowForm={setShowForm} />}
        </span>
      </div>
      <div className="flex flex-col md:flex-row mt-5 ml-5">
        <div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="primary rounded p-2 shadow-md cursor-pointer"
          >
            <option value="">Select Category</option>
            <option value="All">All</option>
            <option value="American">American</option>
            <option value="Asian">Asian</option>
            <option value="Italian">Italian</option>
            <option value="Mexican">Mexican</option>
            {/* Add more categories here */}
          </select>
          <ul className="mt-5 last:mb-10">
            {recipes.map((recipe) => (
              <li
                key={recipe.id}
                onClick={() => handleRecipeClick(recipe)}
                className="cursor-pointer underline hover:scale-125 hover:ml-9"
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
    </>
  );
};

export default Recipes;
