import React, { useState, useEffect } from 'react';
import { FaFile, FaFileImage, FaFilePdf, FaFileWord, FaTrash } from 'react-icons/fa';
import { getTaskAttachments, deleteTaskAttachment, deleteFile } from '../services/api';
import FileUpload from './FileUpload';

const TaskAttachments = ({ taskId }) => {
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAttachments();
  }, [taskId]);

  const fetchAttachments = async () => {
    try {
      setLoading(true);
      const attachmentsData = await getTaskAttachments(taskId);
      setAttachments(attachmentsData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching attachments:', err);
      setError('Failed to load attachments');
      setLoading(false);
    }
  };

  const handleUploadSuccess = (newAttachment) => {
    setAttachments([newAttachment, ...attachments]);
  };

  const handleDelete = async (id, fileKey) => {
    try {
      // Delete attachment record from PostgreSQL
      const deletedFileKey = await deleteTaskAttachment(id);
      
      // Delete file from S3
      if (deletedFileKey) {
        await deleteFile(deletedFileKey);
      }
      
      // Update state
      setAttachments(attachments.filter(attachment => attachment.id !== id));
    } catch (err) {
      console.error('Error deleting attachment:', err);
      setError('Failed to delete attachment');
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('image')) {
      return <FaFileImage />;
    } else if (fileType.includes('pdf')) {
      return <FaFilePdf />;
    } else if (fileType.includes('word') || fileType.includes('document')) {
      return <FaFileWord />;
    } else {
      return <FaFile />;
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size';
    
    const KB = 1024;
    const MB = KB * 1024;
    
    if (bytes < KB) {
      return `${bytes} B`;
    } else if (bytes < MB) {
      return `${(bytes / KB).toFixed(1)} KB`;
    } else {
      return `${(bytes / MB).toFixed(1)} MB`;
    }
  };

  return (
    <div className="task-attachments">
      <h3>Attachments</h3>
      
      <FileUpload taskId={taskId} onUploadSuccess={handleUploadSuccess} />
      
      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <p>Loading attachments...</p>
      ) : attachments.length === 0 ? (
        <p>No attachments yet</p>
      ) : (
        <ul className="attachments-list">
          {attachments.map((attachment) => (
            <li key={attachment.id} className="attachment-item">
              <div className="attachment-icon">
                {getFileIcon(attachment.fileType)}
              </div>
              
              <div className="attachment-details">
                <a 
                  href={attachment.fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="attachment-name"
                >
                  {attachment.fileName}
                </a>
                <span className="attachment-size">
                  {formatFileSize(attachment.fileSize)}
                </span>
              </div>
              
              <button
                onClick={() => handleDelete(attachment.id, attachment.fileKey)}
                className="delete-attachment-btn"
                title="Delete attachment"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskAttachments;
