DROP TABLE IF EXISTS stories CASCADE;
CREATE TABLE stories (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  is_complete BOOLEAN DEFAULT FALSE
);