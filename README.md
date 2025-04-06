# Task Manager Application

## Overview
A comprehensive task management application that provides robust task tracking, file management, and collaboration features.

## 🚀 Technology Stack
- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Databases**: 
  - MongoDB (Task Storage)
  - RDS (Metadata and Comments)
- **File Storage**: AWS S3 Bucket

## ✨ Features
- Create, update, and manage tasks
- Task status tracking (Pending, In Process, Completed)
- File and image upload capabilities
- Centralized task management
- Scalable cloud-based architecture

## 🔧 Prerequisites
- Node.js (v16+ recommended)
- npm
- MongoDB Atlas account
- AWS Account (S3, RDS)

## 📦 Configuration

### Environment Variables
#### Backend (.env)
```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskmanager

# AWS S3 Configuration
S3_BUCKET_NAME=your-task-manager-bucket
AWS_REGION=us-east-1

# RDS Configuration
RDS_HOST=your-rds-endpoint.rds.amazonaws.com
RDS_USER=your_database_username
RDS_PASSWORD=your_database_password
RDS_DATABASE=taskmanager
RDS_PORT=5432

PORT=5000
```

#### Frontend (.env)
```env
REACT_APP_BACKEND_URL=http://localhost:5000/api
```

## 🛠 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Selvaraj-Sathish/MERN-S3-RDS.git

cd MERN-S3-RDS
```

### 2. Install Dependencies
```bash
# Install backend dependencies

cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Run the Application
```bash
# Start backend server
cd backend
npm start

# Start frontend application
cd ../frontend
npm start
```

## 🔒 Security Considerations
- Never commit `.env` files to version control
- Use environment-specific configurations
- Implement proper authentication
- Rotate AWS and database credentials regularly

## 📝 API Endpoints
- `/api/tasks`: Task management
- `/api/files`: File upload/download
- `/api/comments`: Task comments

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License
Distributed under the MIT License.

## 📞 Contact
Your Name - sathish8329@gmail.com

Project Link: https://github.com/Selvaraj-Sathish/MERN-S3-RDS.git

## 🛠 Troubleshooting
- Verify all environment variables are correctly set
- Check network connectivity to databases and AWS services
- Ensure proper IAM permissions for AWS services

## 🚧 Deployment Considerations
- Use environment variables for sensitive configurations
- Implement CORS settings
- Set up HTTPS for all communications
- Use IAM roles for AWS services
```
