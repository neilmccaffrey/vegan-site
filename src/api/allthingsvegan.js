import axios from 'axios';

const API_URL = 'http://localhost:5001';

export const getAllThingsVegan = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/allthingsvegan`);
    return response.data;
  } catch (error) {
    console.error('Error fetching All Things Vegan: ', error);
    throw error;
  }
};
