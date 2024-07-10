"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFriendship = exports.deleteFriendshipsByUserId = void 0;
const db_1 = __importDefault(require("../config/db"));
const deleteFriendshipsByUserId = async (userId) => {
    await db_1.default.query('DELETE FROM friendships WHERE user_id = $1', [userId]);
};
exports.deleteFriendshipsByUserId = deleteFriendshipsByUserId;
const createFriendship = async (userId, friendId) => {
    await db_1.default.query('INSERT INTO friendships (user_id, friend_id) VALUES ($1, $2)', [userId, friendId]);
};
exports.createFriendship = createFriendship;
