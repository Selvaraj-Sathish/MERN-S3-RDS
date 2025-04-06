import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const getTask = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/tasks/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching task ${id}:`, error);
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, taskData);
    return response.data.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (id, taskData) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${id}`, taskData);
    return response.data.data;
  } catch (error) {
    console.error(`Error updating task ${id}:`, error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/tasks/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting task ${id}:`, error);
    throw error;
  }
};
