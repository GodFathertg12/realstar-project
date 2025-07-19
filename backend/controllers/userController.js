const jwt = require('jsonwebtoken');
const db = require('../config/db');
const bcrypt = require('bcryptjs');


exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existing = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const result = await db.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, hashed, role]
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: result.rows[0].id,
        name: result.rows[0].name,
        email: result.rows[0].email,
        role: result.rows[0].role,
      }
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if email exists
      const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      if (user.rows.length === 0) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.rows[0].password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign(
        {
          id: user.rows[0].id,
          email: user.rows[0].email,
          role: user.rows[0].role,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      
  
      // Success
      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user.rows[0].id,
          name: user.rows[0].name,
          email: user.rows[0].email,
          role: user.rows[0].role,
        }
      });
    } catch (err) {
      console.error('Login Error:', err.message);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  
