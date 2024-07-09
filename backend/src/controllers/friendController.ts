import { Request, Response } from 'express';
import axios from 'axios';
import * as userRepository from '../repositories/userRepository';
import * as friendshipRepository from '../repositories/friendRepository';

export const addFriends = async (req: Request, res: Response) => {
  const { username } = req.params;
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

    await friendshipRepository.deleteFriendshipsByUserId(user.id);

    for (const friend of friends) {
      await friendshipRepository.createFriendship(user.id, friend.id);
    }

    res.json(friends);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};
