import { Router } from 'express';
import LogIn from '../controllers/login.controller';

const router: Router = Router();
const login: LogIn = new LogIn();

router.route('/')
    .post(login.login);

router.route('/logout')
    .get(login.logOut);

export default router;
