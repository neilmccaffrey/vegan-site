import PropTypes from 'prop-types';

const RecipeModal = ({ recipe, onClose }) => {
  const { name, servings, ingredients, instructions } = recipe;
  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 mt-20">
      <div className="p-4 border rounded shadow-lg bg-white modal md:ml-40 mb-20 relative max-h-[80vh] md:max-h-[95vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl text-gray-600"
        >
          X
        </button>
        <h1 className="text-center text-xl font-bold">{name}</h1>
        <strong>Servings: {servings}</strong>
        <p>
          <strong>Ingredients:</strong>
        </p>
        <ul className="list-disc ml-5">
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <p>
          <strong>Instructions:</strong>
        </p>
        <ol className="list-disc ml-5">
          {instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

RecipeModal.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string.isRequired,
    servings: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    instructions: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RecipeModal;
