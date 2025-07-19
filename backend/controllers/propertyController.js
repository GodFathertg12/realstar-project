const db = require('../config/db');

exports.createProperty = async (req, res) => {
  const { title, location, price, description, image_url } = req.body;
  const owner_id = req.user.id;

  try {
    const result = await db.query(
      'INSERT INTO properties (title, location, price, description, image_url, owner_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, location, price, description, image_url, owner_id]
    );

    res.status(201).json({
      message: 'Property listed successfully',
      property: result.rows[0]
    });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
