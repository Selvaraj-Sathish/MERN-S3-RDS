import React from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const TaskItem = ({ task, onDelete, onEdit, onView }) => {
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
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
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

  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      
      <div>
        <span className={`badge ${getStatusBadgeClass(task.status)}`}>
          {getStatusText(task.status)}
        </span>
        <small>Created: {formatDate(task.createdAt)}</small>
      </div>
      
      <button className="view-btn" onClick={() => onView(task._id)} title="View details">
        <FaEye />
      </button>
      
      <button className="edit-btn" onClick={() => onEdit(task)} title="Edit task">
        <FaEdit />
      </button>
      
      <button className="delete-btn" onClick={() => onDelete(task._id)} title="Delete task">
        <FaTrash />
      </button>
    </div>
  );
};

export default TaskItem;
