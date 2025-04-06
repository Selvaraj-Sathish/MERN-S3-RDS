import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { uploadFile, addTaskAttachment } from '../services/api';

const FileUpload = ({ taskId, onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setUploadError('Please select a file to upload');
      return;
    }
    
    setUploading(true);
    setUploadError(null);
    
    try {
      // Upload file to S3
      const fileUploadResponse = await uploadFile(selectedFile);
      
      if (fileUploadResponse.success) {
        // Add attachment record to database
        const attachmentData = {
          taskId,
          fileName: selectedFile.name,
          fileUrl: fileUploadResponse.fileUrl,
          fileKey: fileUploadResponse.key,
          fileType: selectedFile.type,
          fileSize: selectedFile.size
        };
        
        // Save attachment metadata in PostgreSQL RDS
        const attachmentResponse = await addTaskAttachment(attachmentData);
        
        // Reset form
        setSelectedFile(null);
        document.getElementById('file-upload').value = '';
        
        // Notify parent component
        if (onUploadSuccess) {
          onUploadSuccess(attachmentResponse);
        }
      }
    } catch (error) {
      console.error('Error in file upload process:', error);
      setUploadError('Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="file-upload-container">
      <h4>Attach Files</h4>
      <form onSubmit={handleSubmit}>
        <div className="file-input-container">
          <input
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            disabled={uploading}
            className="file-input"
          />
          <label htmlFor="file-upload" className="file-label">
            {selectedFile ? selectedFile.name : 'Choose a file'}
          </label>
        </div>
        
        <button
          type="submit"
          className="btn btn-sm"
          disabled={!selectedFile || uploading}
        >
          {uploading ? 'Uploading...' : <><FaUpload /> Upload</>}
        </button>
        
        {uploadError && (
          <div className="upload-error">
            {uploadError}
          </div>
        )}
      </form>
    </div>
  );
};

export default FileUpload;
