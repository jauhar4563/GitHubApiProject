import { Router } from 'express';
import { addFriends } from '../controllers/friendController';

const router = Router();

router.post('/:username/friends', addFriends);

export default router;
