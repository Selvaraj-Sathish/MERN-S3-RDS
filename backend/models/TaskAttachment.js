const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db-postgres');

// Define the TaskAttachment model for PostgreSQL
const TaskAttachment = sequelize.define('TaskAttachment', {
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
  fileName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fileKey: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fileType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fileSize: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  uploadedBy: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = TaskAttachment;
