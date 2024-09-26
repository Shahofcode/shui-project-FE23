import axios from 'axios';

const API_URL = 'https://a2afkmmp5j.execute-api.eu-north-1.amazonaws.com/dev';

export const getMessages = async () => {
  try {
    const response = await axios.get(`${API_URL}/getmessage`);
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

export const postMessage = async (username, text) => {
  try {
    const response = await axios.post(`${API_URL}/postmessage`, {
      username,
      text
    });
    return response.data;
  } catch (error) {
    console.error("Error posting message:", error);
    throw error;
  }
};

export const editMessage = async (id, text) => {
  try {
    const response = await axios.put(`${API_URL}/editmessage`, {
      id,
      text
    });
    return response.data;
  } catch (error) {
    console.error("Error editing message:", error);
    throw error;
  }
};
