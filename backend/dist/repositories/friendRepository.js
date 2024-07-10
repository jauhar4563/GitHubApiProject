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
exports.createFriendship = exports.deleteFriendshipsByUserId = void 0;
const db_1 = __importDefault(require("../config/db"));
const deleteFriendshipsByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.query('DELETE FROM friendships WHERE user_id = $1', [userId]);
});
exports.deleteFriendshipsByUserId = deleteFriendshipsByUserId;
const createFriendship = (userId, friendId) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.query('INSERT INTO friendships (user_id, friend_id) VALUES ($1, $2)', [userId, friendId]);
});
exports.createFriendship = createFriendship;
