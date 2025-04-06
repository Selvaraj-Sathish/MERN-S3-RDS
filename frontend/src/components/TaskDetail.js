import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
import { getTask, deleteTask } from '../services/api';
import TaskAttachments from './TaskAttachments';
import TaskComments from './TaskComments';

const TaskDetail = ({ taskId, onBack, onDelete, onEdit }) => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('attachments');

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        setLoading(true);
        const taskData = await getTask(taskId);
        setTask(taskData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching task details:', err);
        setError('Failed to load task details');
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
        onDelete();
      } catch (err) {
        console.error('Error deleting task:', err);
        setError('Failed to delete task');
      }
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'badge-pending';
      case 'in-progress':
        return 'badge-in-progress';
      case 'completed':
        return 'badge-completed';
      default:
        return 'badge-pending';
    }
  };
  
  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return <div className="loading">Loading task details...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!task) {
    return <div className="error-message">Task not found</div>;
  }

  return (
    <div className="task-detail">
      <div className="task-detail-header">
        <button className="btn-link" onClick={onBack}>
          <FaArrowLeft /> Back to Tasks
        </button>
        
        <div className="task-actions">
          <button 
            className="btn-icon" 
            onClick={() => onEdit(task)}
            title="Edit task"
          >
            <FaEdit />
          </button>
          
          <button 
            className="btn-icon delete" 
            onClick={handleDelete}
            title="Delete task"
          >
            <FaTrash />
          </button>
        </div>
      </div>
      
      <div className="task-detail-content">
        <h2>{task.title}</h2>
        
        <div className="task-meta">
          <span className={`badge ${getStatusBadgeClass(task.status)}`}>
            {getStatusText(task.status)}
          </span>
          <span className="created-date">
            Created: {formatDate(task.createdAt)}
          </span>
        </div>
        
        {task.description && (
          <div className="task-description">
            <h3>Description</h3>
            <p>{task.description}</p>
          </div>
        )}
        
        <div className="task-tabs">
          <div className="tab-buttons">
            <button 
              className={`tab-button ${activeTab === 'attachments' ? 'active' : ''}`}
              onClick={() => setActiveTab('attachments')}
            >
              Attachments
            </button>
            
            <button 
              className={`tab-button ${activeTab === 'comments' ? 'active' : ''}`}
              onClick={() => setActiveTab('comments')}
            >
              Comments
            </button>
          </div>
          
          <div className="tab-content">
            {activeTab === 'attachments' && (
              <TaskAttachments taskId={taskId} />
            )}
            
            {activeTab === 'comments' && (
              <TaskComments taskId={taskId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
