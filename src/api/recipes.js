import axios from 'axios';

const API_URL = 'http://localhost:5001';

export const getRecipes = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/recipes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes: ', error);
    throw error;
  }
};
