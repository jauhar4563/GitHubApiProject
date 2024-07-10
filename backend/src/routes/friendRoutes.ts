import { Router } from 'express';
import { addFriends } from '../controllers/friendController';

const router = Router();

router.get('/:username', addFriends);

export default router;
