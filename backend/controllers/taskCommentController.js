const TaskComment = require('../models/TaskComment');
const Task = require('../models/Task');

// @desc    Add comment to a task
// @route   POST /api/task-comments
// @access  Public
exports.addComment = async (req, res) => {
  try {
    const { taskId, content, author } = req.body;
    
    // Check if task exists in MongoDB
    const task = await Task.findById(taskId);
    
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    
    // Create comment in PostgreSQL
    const comment = await TaskComment.create({
      taskId,
      content,
      author: author || 'Anonymous'
    });
    
    res.status(201).json({ success: true, data: comment });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// @desc    Get all comments for a task
// @route   GET /api/task-comments/:taskId
// @access  Public
exports.getTaskComments = async (req, res) => {
  try {
    const { taskId } = req.params;
    
    // Get all comments for the task from PostgreSQL
    const comments = await TaskComment.findAll({
      where: { taskId },
      order: [['createdAt', 'ASC']]
    });
    
    res.status(200).json({ success: true, count: comments.length, data: comments });
  } catch (error) {
    console.error('Error getting comments:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// @desc    Delete a comment
// @route   DELETE /api/task-comments/:id
// @access  Public
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the comment
    const comment = await TaskComment.findByPk(id);
    
    if (!comment) {
      return res.status(404).json({ success: false, error: 'Comment not found' });
    }
    
    // Delete from database
    await comment.destroy();
    
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
