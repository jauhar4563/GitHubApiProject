import pool from '../config/db';
import { Friendship } from '../models/friendModel';

export const deleteFriendshipsByUserId = async (userId: number): Promise<void> => {
  await pool.query('DELETE FROM friendships WHERE user_id = $1', [userId]);
};

export const createFriendship = async (userId: number, friendId: number): Promise<void> => {
  await pool.query(
    'INSERT INTO friendships (user_id, friend_id) VALUES ($1, $2)',
    [userId, friendId]
  );
};
