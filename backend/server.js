const express = require('express');
const mysql = require('mysql');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 8081;

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Test the MySQL connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
  connection.release();
});

// Define your API routes
app.get('/users', (req, res) => {
  // Execute a query using the MySQL connection pool
  pool.query('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(rows);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
