import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Task API calls
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

// File upload API calls
export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axios.post(`${API_URL}/files/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const deleteFile = async (fileKey) => {
  try {
    await axios.delete(`${API_URL}/files/${fileKey}`);
    return true;
  } catch (error) {
    console.error(`Error deleting file ${fileKey}:`, error);
    throw error;
  }
};

// Task attachment API calls
export const addTaskAttachment = async (attachmentData) => {
  try {
    const response = await axios.post(`${API_URL}/task-attachments`, attachmentData);
    return response.data.data;
  } catch (error) {
    console.error('Error adding attachment:', error);
    throw error;
  }
};

export const getTaskAttachments = async (taskId) => {
  try {
    const response = await axios.get(`${API_URL}/task-attachments/${taskId}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching attachments for task ${taskId}:`, error);
    throw error;
  }
};

export const deleteTaskAttachment = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/task-attachments/${id}`);
    return response.data.fileKey;
  } catch (error) {
    console.error(`Error deleting attachment ${id}:`, error);
    throw error;
  }
};

// Task comment API calls
export const addTaskComment = async (commentData) => {
  try {
    const response = await axios.post(`${API_URL}/task-comments`, commentData);
    return response.data.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

export const getTaskComments = async (taskId) => {
  try {
    const response = await axios.get(`${API_URL}/task-comments/${taskId}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching comments for task ${taskId}:`, error);
    throw error;
  }
};

export const deleteTaskComment = async (id) => {
  try {
    await axios.delete(`${API_URL}/task-comments/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting comment ${id}:`, error);
    throw error;
  }
};
