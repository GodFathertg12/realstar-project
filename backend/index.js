const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');

const userRoutes = require('./routes/userRoutes'); // ✅ THIS IS REQUIRED
const propertyRoutes = require('./routes/propertyRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);

app.get('/', (req, res) => {
  res.send('RealStar backend is running ✅');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
