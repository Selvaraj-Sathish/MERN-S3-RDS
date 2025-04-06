const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Determine if we're using IAM authentication or standard credentials
const useIAM = process.env.USE_IAM_AUTH === 'true';

// Configure Sequelize with IAM auth if enabled
let sequelizeConfig = {
  host: process.env.RDS_HOSTNAME,
  port: process.env.RDS_PORT || 5432,
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

// If using IAM authentication, AWS SDK will automatically use the IAM role
if (useIAM) {
  // For IAM authentication with RDS
  const AWS = require('aws-sdk');
  const signer = new AWS.RDS.Signer({
    region: process.env.AWS_REGION || 'us-east-1',
    hostname: process.env.RDS_HOSTNAME,
    port: parseInt(process.env.RDS_PORT || '5432', 10),
    username: process.env.RDS_USERNAME
  });

  sequelizeConfig.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    authPlugins: {
      mysql_clear_password: () => () => {
        return signer.getAuthToken({
          username: process.env.RDS_USERNAME
        });
      }
    }
  };
} else {
  // Standard username/password auth
  sequelizeConfig.username = process.env.RDS_USERNAME;
  sequelizeConfig.password = process.env.RDS_PASSWORD;
  sequelizeConfig.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  };
}

// Create Sequelize instance with RDS connection details
const sequelize = new Sequelize(
  process.env.RDS_DATABASE,
  null, // Username handled in config
  null, // Password handled in config
  sequelizeConfig
);

const connectPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL RDS connection established successfully');
  } catch (error) {
    console.error('Unable to connect to PostgreSQL RDS:', error);
    // Don't exit process here, as we'll still use MongoDB as primary database
  }
};

module.exports = { sequelize, connectPostgres };
