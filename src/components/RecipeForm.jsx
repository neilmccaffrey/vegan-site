import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const RecipeForm = ({ setShowForm }) => {
  const [formData, setFormData] = useState({
    recipeName: '',
    ingredients: '',
    instructions: '',
    servings: '',
    credit: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if required fields are filled
    const { recipeName, ingredients, instructions, servings } = formData;
    if (!recipeName || !ingredients || !instructions || !servings) {
      setError(
        'Recipe Name, Ingredients, Instructions, and Servings are required.'
      );
      return;
    }
    try {
      await axios.post('http://localhost:5001/submit-recipe', formData);
      alert('Recipe Submitted!');
    } catch (error) {
      console.error('Error submitting recipe:', error);
    }
    //if form is valid
    setError('');

    setShowForm(false);
  };

  const handleCancel = () => {
    // Close the form when cancel is clicked
    setShowForm(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-2  mt-2 w-80 md:w-100 bg-white modal p-2 rounded border shadow-lg"
    >
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div className="flex flex-col">
        <label>Recipe Name:</label>
        <input
          type="text"
          name="recipeName"
          value={formData.recipeName}
          onChange={handleChange}
          className="border rounded p-2 mt-1 w-full"
        />
      </div>
      <div className="flex flex-col">
        <label>Ingredients:</label>
        <textarea
          name="ingredients"
          value={formData.ingredients}
          placeholder="Please provide clear ingredients and amounts"
          onChange={handleChange}
          className="border rounded p-2 mt-1 w-full"
        />
      </div>
      <div className="flex flex-col">
        <label>Instructions:</label>
        <textarea
          name="instructions"
          value={formData.instructions}
          placeholder="Please provide clear instructions"
          onChange={handleChange}
          className="border rounded p-2 mt-1 w-full"
        />
      </div>
      <div className="flex flex-col">
        <label>Servings:</label>
        <input
          type="text"
          name="servings"
          value={formData.servings}
          onChange={handleChange}
          className="border rounded p-2 mt-1 w-full"
        />
      </div>
      <div className="flex flex-col">
        <label>Credit:</label>
        <input
          type="text"
          name="credit"
          value={formData.credit}
          placeholder="Who should get the credit? (not required)"
          onChange={handleChange}
          className="border rounded p-2 mt-1 w-full"
        />
      </div>
      <div className="mt-4 ml-auto space-x-4">
        <button
          type="button"
          onClick={handleCancel}
          className="p-2 bg-gray-500 text-white rounded cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className=" p-2 bg-blue-500 text-white rounded cursor-pointer"
        >
          Submit Recipe
        </button>
      </div>
    </form>
  );
};

RecipeForm.propTypes = {
  setShowForm: PropTypes.func.isRequired,
};

export default RecipeForm;
