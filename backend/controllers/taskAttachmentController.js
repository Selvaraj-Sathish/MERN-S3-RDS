const TaskAttachment = require('../models/TaskAttachment');
const Task = require('../models/Task');

// @desc    Add attachment to a task
// @route   POST /api/task-attachments
// @access  Public
exports.addAttachment = async (req, res) => {
  try {
    const { taskId, fileName, fileUrl, fileKey, fileType, fileSize } = req.body;
    
    // Check if task exists in MongoDB
    const task = await Task.findById(taskId);
    
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    
    // Create attachment in PostgreSQL
    const attachment = await TaskAttachment.create({
      taskId,
      fileName,
      fileUrl,
      fileKey,
      fileType,
      fileSize,
      uploadedBy: 'Anonymous' // In a real app, this would be the user ID
    });
    
    res.status(201).json({ success: true, data: attachment });
  } catch (error) {
    console.error('Error adding attachment:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// @desc    Get all attachments for a task
// @route   GET /api/task-attachments/:taskId
// @access  Public
exports.getTaskAttachments = async (req, res) => {
  try {
    const { taskId } = req.params;
    
    // Get all attachments for the task from PostgreSQL
    const attachments = await TaskAttachment.findAll({
      where: { taskId },
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json({ success: true, count: attachments.length, data: attachments });
  } catch (error) {
    console.error('Error getting attachments:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// @desc    Delete an attachment
// @route   DELETE /api/task-attachments/:id
// @access  Public
exports.deleteAttachment = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the attachment
    const attachment = await TaskAttachment.findByPk(id);
    
    if (!attachment) {
      return res.status(404).json({ success: false, error: 'Attachment not found' });
    }
    
    // Delete from database
    await attachment.destroy();
    
    res.status(200).json({ success: true, data: {}, fileKey: attachment.fileKey });
  } catch (error) {
    console.error('Error deleting attachment:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
