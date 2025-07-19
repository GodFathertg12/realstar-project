// backend/config/db.js

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.connect()
  .then(() => console.log('🟢 Connected to PostgreSQL Database'))
  .catch((err) => console.error('🔴 DB Connection Error:', err.message));

// ✅ Export the pool so you can call pool.query(...)
module.exports = pool;
