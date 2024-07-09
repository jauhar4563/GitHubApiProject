import { Router } from 'express';
import { createUser, searchUsers, deleteUser, updateUser, getSortedUsers } from '../controllers/userController';

const router = Router();

router.post('/', createUser);
router.get('/', searchUsers);
router.delete('/:username', deleteUser);
router.put('/:username', updateUser);
router.get('/sorted', getSortedUsers);

export default router;
