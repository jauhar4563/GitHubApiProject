import pool from "../config/db";
import { User } from "../models/userModel";

export const getUserByUsername = async (
  username: string
): Promise<User | null> => {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return result.rows.length ? result.rows[0] : null;
};

export const createUser = async (userData: User): Promise<void> => {
  await pool.query(
    `INSERT INTO users (username, name, location, bio, blog, public_repos, public_gists, followers, following, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
    [
      userData.username,
      userData.name,
      userData.location,
      userData.profile,
      userData.bio,
      userData.blog,
      userData.public_repos,
      userData.public_gists,
      userData.followers,
      userData.following,
      userData.created_at,
      userData.updated_at,
    ]
  );
};

export const searchUsers = async (
  username: string | undefined,
  location: string | undefined
): Promise<User[]> => {
  const result = await pool.query(
    `SELECT * FROM users WHERE 
      ($1::text IS NULL OR username LIKE '%' || $1 || '%') AND 
      ($2::text IS NULL OR location LIKE '%' || $2 || '%')`,
    [username, location]
  );
  return result.rows;
};

export const deleteUser = async (username: string): Promise<void> => {
  await pool.query("UPDATE users SET deleted_at = NOW() WHERE username = $1", [
    username,
  ]);
};

export const updateUser = async (
  username: string,
  location: string,
  blog: string,
  bio: string
): Promise<User | null> => {
  const result = await pool.query(
    `UPDATE users SET location = $1, blog = $2, bio = $3, updated_at = NOW() WHERE username = $4 RETURNING *`,
    [location, blog, bio, username]
  );
  return result.rows.length ? result.rows[0] : null;
};

export const getSortedUsers = async (sortBy: string): Promise<User[]> => {
  const result = await pool.query(`SELECT * FROM users ORDER BY ${sortBy} ASC`);
  return result.rows;
};
