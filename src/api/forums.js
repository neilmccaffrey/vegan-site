import axios from 'axios';

const API_URL = 'http://localhost:5001';

export const getVeganForums = async () => {
  try {
    const response = await axios.get(`${API_URL}/vegan-forums`);
    return response.data;
  } catch (error) {
    console.error('Error fetching vegan forums:', error);
    throw error;
  }
};

export const fetchPosts = async (topic) => {
  try {
    const response = await axios.get(`${API_URL}/api/forums/${topic}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts: ', error);
    throw error;
  }
};
