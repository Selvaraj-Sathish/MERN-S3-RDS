import React, { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { getTasks, createTask, updateTask, deleteTask } from './services/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await getTasks();
        setTasks(tasksData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch tasks. Please try again later.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchTasks();
  }, []);

  // Add a new task
  const handleAddTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks([newTask, ...tasks]);
    } catch (err) {
      setError('Failed to add task. Please try again.');
      console.error(err);
    }
  };

  // Update an existing task
  const handleUpdateTask = async (id, taskData) => {
    try {
      const updatedTask = await updateTask(id, taskData);
      setTasks(tasks.map(task => 
        task._id === id ? updatedTask : task
      ));
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error(err);
    }
  };

  // Delete a task
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error(err);
    }
  };

  // Set current task for editing
  const handleEditTask = (task) => {
    setCurrentTask(task);
    // Scroll to the form
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Clear any error
  const clearError = () => {
    setError(null);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Task Manager</h1>
        <p>A simple demo application using the MERN stack</p>
      </div>

      {error && (
        <div className="alert alert-danger" style={{ 
          padding: '10px', 
          background: '#f8d7da', 
          color: '#721c24',
          borderRadius: '5px',
          marginBottom: '1rem'
        }}>
          <p>{error}</p>
          <button 
            onClick={clearError}
            style={{
              background: 'none',
              border: 'none',
              color: '#721c24',
              fontWeight: 'bold',
              cursor: 'pointer',
              float: 'right'
            }}
          >
            ×
          </button>
        </div>
      )}

      <TaskForm 
        onAddTask={handleAddTask} 
        currentTask={currentTask}
        onUpdateTask={handleUpdateTask}
        setCurrentTask={setCurrentTask}
      />

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p>Loading tasks...</p>
        </div>
      ) : (
        <TaskList 
          tasks={tasks} 
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
        />
      )}
    </div>
  );
}
