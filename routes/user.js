import express from 'express';

import { Signin, Signup } from '../controllers/user.js';

const router = express.Router();

router.post('/signin', Signin);
router.post('/signup', Signup);

export default router;
