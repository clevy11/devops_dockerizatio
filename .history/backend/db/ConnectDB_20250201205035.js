// Importing the 'pg' module for PostgreSQL connection
const { Pool } = require("pg");

// Async function to connect to PostgreSQL and set up the database
const ConnectDB = async () => {
  // Creating a connection pool with credentials from environment variables
  const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT, // PostgreSQL default is 5432
    max: process.env.DB_CONNECTIONLIMIT || 10, // Max connections in pool
    idleTimeoutMillis: 30000, // Close idle clients after 30 sec
  });

  try {
    const client = await pool.connect(); // Get a connection from the pool

    // Create database if it does not exist (PostgreSQL does not support CREATE DATABASE in a transaction)
    await client.query(`CREATE TABLE IF NOT EXISTS ${process.env.DB_TABLENAME} (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
    console.log(`${process.env.DB_TABLENAME} table created or already exists.`);

    client.release(); // Release the client back to the pool
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
    throw error;
  }

  return pool; // Return the pool for executing further queries
};

// Exporting the function
module.exports = ConnectDB;
