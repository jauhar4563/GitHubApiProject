import { Request, Response } from "express";
import axios from "axios";
import { User } from "../models/userModel";
import * as userRepository from "../repositories/userRepository";

export const createUser = async (req: Request, res: Response) => {
  const { username } = req.body;
  try {
    let user: User | null = await userRepository.getUserByUsername(username);
    if (!user) {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      const userData: User = {
        id: 0,
        username: response.data.login,
        name: response.data.name,
        location: response.data.location,
        profile:response.data.avatar_url,
        bio: response.data.bio,
        blog: response.data.blog,
        public_repos: response.data.public_repos,
        public_gists: response.data.public_gists,
        followers: response.data.followers,
        following: response.data.following,
        created_at: new Date(response.data.created_at),
        updated_at: new Date(response.data.updated_at),
      };
      await userRepository.createUser(userData);
      user = await userRepository.getUserByUsername(username);
    }
    if (user) {
      const reposResponse = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
      const repos = reposResponse.data;

      user.repos = repos; 
    } else {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);

  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({ error: error.message });
  }
};


export const getFollowersAndFriends = async (req: Request, res: Response) => {
  const { username } = req.params;
  console.log(username)
  try {
    const user = await userRepository.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const followersResponse = await axios.get(`https://api.github.com/users/${username}/followers`);
    const followingResponse = await axios.get(`https://api.github.com/users/${username}/following`);

    const followers = followersResponse.data.map((f: any) => f.login);
    const following = followingResponse.data.map((f: any) => f.login);

    const mutualFollowers = followers.filter((f: any) => following.includes(f));
    const friends = await userRepository.searchUsers(mutualFollowers, undefined);

    const followerDetails = await Promise.all(
      followers.map(async (followerUsername: string) => {
        const follower = await userRepository.getUserByUsername(followerUsername);
        if (follower) {
          return follower;
        }
        const response = await axios.get(`https://api.github.com/users/${followerUsername}`);
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
        await userRepository.createUser(followerData);
        return followerData;
      })
    );

    res.json({
      followers: followerDetails,
      friends,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const searchUsers = async (req: Request, res: Response) => {
  const { username, location } = req.query;
  try {
    const users = await userRepository.searchUsers(
      username as string | undefined,
      location as string | undefined
    );
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    await userRepository.deleteUser(username);
    res.json({ message: "User deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { username } = req.params;
  const { location, blog, bio } = req.body;
  try {
    const user = await userRepository.updateUser(username, location, blog, bio);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getSortedUsers = async (req: Request, res: Response) => {
  const { sortBy } = req.query;
  try {
    const users = await userRepository.getSortedUsers(sortBy as string);
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
