"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getSortedUsers = exports.updateUser = exports.deleteUser = exports.searchUsers = exports.getFollowersAndFriends = exports.createUser = void 0;
const axios_1 = __importDefault(require("axios"));
const userRepository = __importStar(require("../repositories/userRepository"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    try {
        let user = yield userRepository.getUserByUsername(username);
        if (!user) {
            const response = yield axios_1.default.get(`https://api.github.com/users/${username}`);
            const userData = {
                id: 0,
                username: response.data.login,
                name: response.data.name,
                location: response.data.location,
                profile: response.data.avatar_url,
                bio: response.data.bio,
                blog: response.data.blog,
                public_repos: response.data.public_repos,
                public_gists: response.data.public_gists,
                followers: response.data.followers,
                following: response.data.following,
                created_at: new Date(response.data.created_at),
                updated_at: new Date(response.data.updated_at),
            };
            yield userRepository.createUser(userData);
            user = yield userRepository.getUserByUsername(username);
        }
        if (user) {
            const reposResponse = yield axios_1.default.get(`https://api.github.com/users/${username}/repos`);
            const repos = reposResponse.data;
            user.repos = repos;
        }
        else {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
});
exports.createUser = createUser;
const getFollowersAndFriends = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    console.log(username);
    try {
        const user = yield userRepository.getUserByUsername(username);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const followersResponse = yield axios_1.default.get(`https://api.github.com/users/${username}/followers`);
        const followingResponse = yield axios_1.default.get(`https://api.github.com/users/${username}/following`);
        const followers = followersResponse.data.map((f) => f.login);
        const following = followingResponse.data.map((f) => f.login);
        const mutualFollowers = followers.filter((f) => following.includes(f));
        const friends = yield userRepository.searchUsers(mutualFollowers, undefined);
        const followerDetails = yield Promise.all(followers.map((followerUsername) => __awaiter(void 0, void 0, void 0, function* () {
            const follower = yield userRepository.getUserByUsername(followerUsername);
            if (follower) {
                return follower;
            }
            const response = yield axios_1.default.get(`https://api.github.com/users/${followerUsername}`);
            const followerData = {
                id: 0,
                username: response.data.login,
                name: response.data.name,
                location: response.data.location,
                profile: response.data.avatar_url,
                bio: response.data.bio,
                blog: response.data.blog,
                public_repos: response.data.public_repos,
                public_gists: response.data.public_gists,
                followers: response.data.followers,
                following: response.data.following,
                created_at: new Date(response.data.created_at),
                updated_at: new Date(response.data.updated_at),
            };
            yield userRepository.createUser(followerData);
            return followerData;
        })));
        res.json({
            followers: followerDetails,
            friends,
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
});
exports.getFollowersAndFriends = getFollowersAndFriends;
const searchUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, location } = req.query;
    try {
        const users = yield userRepository.searchUsers(username, location);
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.searchUsers = searchUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    try {
        yield userRepository.deleteUser(username);
        res.json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const { location, blog, bio } = req.body;
    try {
        const user = yield userRepository.updateUser(username, location, blog, bio);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateUser = updateUser;
const getSortedUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sortBy } = req.query;
    try {
        const users = yield userRepository.getSortedUsers(sortBy);
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getSortedUsers = getSortedUsers;
