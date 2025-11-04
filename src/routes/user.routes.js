

import { Router } from 'express';
import { getSelf } from '../controllers/user.controller.js';
import { requireAuth } from '../middleware/requireAuth.js';
// import { requireRole } from '../middleware/requireRole.js';

const router = Router();

router.get('/api/v1/users/self', requireAuth, getSelf);

export default router;
