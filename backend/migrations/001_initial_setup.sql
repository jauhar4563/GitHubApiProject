
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  location VARCHAR(255),
  bio TEXT,
  blog VARCHAR(255),
  public_repos INT,
  public_gists INT,
  followers INT,
  following INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS friendships (
  user_id INT REFERENCES users(id),
  friend_id INT REFERENCES users(id),
  PRIMARY KEY (user_id, friend_id)
);
