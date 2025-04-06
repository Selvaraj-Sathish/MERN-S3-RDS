const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { sequelize, connectPostgres } = require('./config/db-postgres');

// Load env vars
dotenv.config();

// Connect to MongoDB database
connectDB();

// Connect to PostgreSQL RDS database
connectPostgres();

// Sync Sequelize models with RDS
(async () => {
  try {
    await sequelize.sync({ alter: true }); // Use { force: true } to drop and recreate tables
    console.log('PostgreSQL RDS tables synced');
  } catch (error) {
    console.error('Error syncing PostgreSQL RDS tables:', error);
  }
})();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/files', require('./routes/files'));
app.use('/api/task-attachments', require('./routes/taskAttachments'));
app.use('/api/task-comments', require('./routes/taskComments'));

// Default route
app.get('/', (req, res) => {
  res.send('Task Manager API is running!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
