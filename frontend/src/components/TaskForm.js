import React, { useState, useEffect } from 'react';

const TaskForm = ({ onAddTask, currentTask, onUpdateTask, setCurrentTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    // If currentTask is provided, set form fields for editing
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description || '');
      setStatus(currentTask.status);
    }
  }, [currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please add a task title');
      return;
    }
    
    const taskData = {
      title,
      description,
      status
    };
    
    if (currentTask) {
      // Update existing task
      onUpdateTask(currentTask._id, taskData);
      setCurrentTask(null); // Reset current task after update
    } else {
      // Add new task
      onAddTask(taskData);
    }
    
    // Clear form
    setTitle('');
    setDescription('');
    setStatus('pending');
  };
  
  const handleCancel = () => {
    setCurrentTask(null);
    setTitle('');
    setDescription('');
    setStatus('pending');
  };

  return (
    <div className="task-form">
      <h2>{currentTask ? 'Edit Task' : 'Add Task'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="form-control"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            className="select-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <button type="submit" className="btn btn-block">
          {currentTask ? 'Update Task' : 'Save Task'}
        </button>
        
        {currentTask && (
          <button 
            type="button" 
            className="btn btn-block btn-danger" 
            onClick={handleCancel}
            style={{ marginTop: '10px' }}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default TaskForm;
