import { Router } from 'express';
import authenticate from '../middleware/auth.middleware';
import { getProfile } from '../controllers/profile.controller';

const router: Router = Router();

router.use(authenticate);

router.route('/')
    .get(getProfile);

export default router;
