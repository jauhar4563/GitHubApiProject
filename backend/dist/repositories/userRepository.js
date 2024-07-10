"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSortedUsers = exports.updateUser = exports.deleteUser = exports.searchUsers = exports.createUser = exports.getUserByUsername = void 0;
const db_1 = __importDefault(require("../config/db"));
const getUserByUsername = async (username) => {
    const result = await db_1.default.query("SELECT * FROM users WHERE username = $1", [
        username,
    ]);
    return result.rows.length ? result.rows[0] : null;
};
exports.getUserByUsername = getUserByUsername;
const createUser = async (userData) => {
    await db_1.default.query(`INSERT INTO users (username, name, location, profile, bio, blog, public_repos, public_gists, followers, following, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`, [
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
        userData.created_at.toUTCString(),
        userData.updated_at.toUTCString(),
    ]);
};
exports.createUser = createUser;
const searchUsers = async (username, location) => {
    const result = await db_1.default.query(`SELECT * FROM users WHERE 
      ($1::text IS NULL OR username LIKE '%' || $1 || '%') AND 
      ($2::text IS NULL OR location LIKE '%' || $2 || '%')`, [username, location]);
    return result.rows;
};
exports.searchUsers = searchUsers;
const deleteUser = async (username) => {
    await db_1.default.query("UPDATE users SET deleted_at = NOW() WHERE username = $1", [
        username,
    ]);
};
exports.deleteUser = deleteUser;
const updateUser = async (username, location, blog, bio) => {
    const result = await db_1.default.query(`UPDATE users SET location = $1, blog = $2, bio = $3, updated_at = NOW() WHERE username = $4 RETURNING *`, [location, blog, bio, username]);
    return result.rows.length ? result.rows[0] : null;
};
exports.updateUser = updateUser;
const getSortedUsers = async (sortBy) => {
    const result = await db_1.default.query(`SELECT * FROM users ORDER BY ${sortBy} ASC`);
    return result.rows;
};
exports.getSortedUsers = getSortedUsers;
