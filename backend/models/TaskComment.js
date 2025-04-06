const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db-postgres');

// Define the TaskComment model for PostgreSQL
const TaskComment = sequelize.define('TaskComment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  taskId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'MongoDB ObjectId of the associated task'
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Anonymous'
  }
}, {
  timestamps: true
});

module.exports = TaskComment;
