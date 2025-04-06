import React, { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
import { getTasks, createTask, updateTask, deleteTask } from './services/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [view, setView] = useState('list'); // 'list', 'detail'

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
      
      // If we're editing a task that's currently being viewed in detail
      if (selectedTaskId === id) {
        setSelectedTaskId(updatedTask._id);
      }
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
      
      // If we're deleting a task that's currently being viewed in detail
      if (selectedTaskId === id) {
        setSelectedTaskId(null);
        setView('list');
      }
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

  // View task details
  const handleViewTask = (taskId) => {
    setSelectedTaskId(taskId);
    setView('detail');
  };

  // Go back to task list
  const handleBackToList = () => {
    setSelectedTaskId(null);
    setView('list');
  };

  // Clear any error
  const clearError = () => {
    setError(null);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Task Manager</h1>
        <p>A simple demo application using MERN stack with AWS S3 and RDS</p>
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

      {view === 'list' && (
        <>
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
              onViewTask={handleViewTask}
            />
          )}
        </>
      )}

      {view === 'detail' && selectedTaskId && (
        <TaskDetail 
          taskId={selectedTaskId}
          onBack={handleBackToList}
          onDelete={() => handleDeleteTask(selectedTaskId)}
          onEdit={handleEditTask}
        />
      )}
    </div>
  );
}

export default App;
