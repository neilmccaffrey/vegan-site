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

export const addPost = async (topic, postData) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/forums/${topic}`,
      postData
    );
    if (response.status === 201) {
      return response.data; // Return the full post object from the backend
    } else {
      return null;
    }
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || 'An unknown error occurred.'
      );
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request:', error.request);
      throw new Error('No response received from the server.');
    } else {
      // Something else triggered the error
      console.error('Error:', error.message);
      throw new Error('Error with the request.');
    }
  }
};

export const userLike = async (topic, userSub, postId) => {
  try {
    await axios.put(`${API_URL}/api/forums/${topic}/${postId}/like`, {
      sub: userSub,
    });
  } catch (error) {
    console.error('Error liking post:', error);
  }
};

export const addComment = async (topic, username, sub, postId, comment) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/forums/${topic}/${postId}/comment`,
      {
        sub,
        username,
        comment,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
  }
};

export const editPost = async (topic, sub, postId, editedContent) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/forums/${topic}/${postId}/edit`,
      {
        sub,
        editedContent,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error editing post:', error);
  }
};
