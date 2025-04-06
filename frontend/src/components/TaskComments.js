import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { getTaskComments, addTaskComment, deleteTaskComment } from '../services/api';

const TaskComments = ({ taskId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define fetchComments inside useEffect to avoid initialization error
    const fetchComments = async () => {
      try {
        setLoading(true);
        const commentsData = await getTaskComments(taskId);
        setComments(commentsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching comments:', err);
        setError('Failed to load comments');
        setLoading(false);
      }
    };

    fetchComments();
  }, [taskId]); // Only depends on taskId

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      return;
    }
    
    try {
      const commentData = {
        taskId,
        content: newComment,
        author: author || 'Anonymous'
      };
      
      const addedComment = await addTaskComment(commentData);
      
      // Update state with new comment
      setComments([...comments, addedComment]);
      
      // Clear form
      setNewComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
      setError('Failed to add comment');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTaskComment(id);
      
      // Update state
      setComments(comments.filter(comment => comment.id !== id));
    } catch (err) {
      console.error('Error deleting comment:', err);
      setError('Failed to delete comment');
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    
    return new Date(dateString).toLocaleString('en-US', options);
  };

  return (
    <div className="task-comments">
      <h3>Comments</h3>
      
      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <p>Loading comments...</p>
      ) : (
        <div className="comments-list">
          {comments.length === 0 ? (
            <p>No comments yet</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-header">
                  <span className="comment-author">{comment.author}</span>
                  <span className="comment-date">{formatDate(comment.createdAt)}</span>
                </div>
                
                <div className="comment-content">{comment.content}</div>
                
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="delete-comment-btn"
                  title="Delete comment"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>
      )}
      
      <div className="add-comment">
        <h4>Add a Comment</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Your name (optional)"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <textarea
              placeholder="Write your comment here..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="form-control"
              required
            ></textarea>
          </div>
          
          <button type="submit" className="btn btn-block">
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskComments;
