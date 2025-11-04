

import { Router } from 'express';
import { getSelf,login } from '../controllers/user.controller.js';
import { requireAuth } from '../middleware/requireAuth.js';
// import { requireRole } from '../middleware/requireRole.js';

const router = Router();
router.post("/auth/login",requireAuth,login);

router.get('/users/self', requireAuth, getSelf);

export default router;
