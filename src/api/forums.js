import axios from 'axios';

const API_URL = 'http://localhost:5001'; // Make sure this is the correct URL for your backend

export const getVeganForums = async () => {
  try {
    const response = await axios.get(`${API_URL}/vegan-forums`);
    return response.data;
  } catch (error) {
    console.error('Error fetching vegan forums:', error);
    throw error;
  }
};
