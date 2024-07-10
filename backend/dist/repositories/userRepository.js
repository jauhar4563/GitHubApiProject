"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSortedUsers = exports.updateUser = exports.deleteUser = exports.searchUsers = exports.createUser = exports.getUserByUsername = void 0;
const db_1 = __importDefault(require("../config/db"));
const getUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query("SELECT * FROM users WHERE username = $1", [
        username,
    ]);
    return result.rows.length ? result.rows[0] : null;
});
exports.getUserByUsername = getUserByUsername;
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.query(`INSERT INTO users (username, name, location, profile, bio, blog, public_repos, public_gists, followers, following, created_at, updated_at)
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
});
exports.createUser = createUser;
const searchUsers = (username, location) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query(`SELECT * FROM users WHERE 
      ($1::text IS NULL OR username LIKE '%' || $1 || '%') AND 
      ($2::text IS NULL OR location LIKE '%' || $2 || '%')`, [username, location]);
    return result.rows;
});
exports.searchUsers = searchUsers;
const deleteUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.query("UPDATE users SET deleted_at = NOW() WHERE username = $1", [
        username,
    ]);
});
exports.deleteUser = deleteUser;
const updateUser = (username, location, blog, bio) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query(`UPDATE users SET location = $1, blog = $2, bio = $3, updated_at = NOW() WHERE username = $4 RETURNING *`, [location, blog, bio, username]);
    return result.rows.length ? result.rows[0] : null;
});
exports.updateUser = updateUser;
const getSortedUsers = (sortBy) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query(`SELECT * FROM users ORDER BY ${sortBy} ASC`);
    return result.rows;
});
exports.getSortedUsers = getSortedUsers;
