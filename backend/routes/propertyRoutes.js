const express = require('express');
const router = express.Router();
const { createProperty } = require('../controllers/propertyController');
const protect = require('../middleware/authMiddleware');
const db = require('../config/db');

// 👇 POST route to create a property (must be logged in)
router.post('/', protect, createProperty);

router.get('/', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM properties ORDER BY created_at DESC');
      res.json(result.rows);
    } catch (err) {
      console.error('Error fetching properties:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
module.exports = router;
