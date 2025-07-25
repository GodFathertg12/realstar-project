--USERS TABLE
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)UNIQUE NOT NULL,
  password VARCHAR(200)NOT NULL,
  role VARCHAR(50)NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--PROPERTIES TABLE
CREATE TABLE properties(
  id SERIAL PRIMARY KEY,
  title VARCHAR(150)NOT NULL,
  location VARCHAR(255)NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT,
  image_url TEXT,
  owner_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);