import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onDeleteTask, onEditTask, onViewTask }) => {
  if (tasks.length === 0) {
    return <div className="no-tasks">No tasks found. Add a task to get started!</div>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem 
          key={task._id} 
          task={task} 
          onDelete={onDeleteTask}
          onEdit={onEditTask}
          onView={onViewTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
