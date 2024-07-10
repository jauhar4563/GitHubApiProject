import { Router } from 'express';
import { createUser, searchUsers, deleteUser, updateUser, getSortedUsers, getFollowersAndFriends } from '../controllers/userController';

const router = Router();

router.post('/', createUser);
router.get('/', searchUsers);
router.delete('/:username', deleteUser);
router.get('/:username/followers', getFollowersAndFriends);
router.put('/:username', updateUser);
router.get('/sorted', getSortedUsers);

export default router;
