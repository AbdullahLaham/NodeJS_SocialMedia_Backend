import express from 'express';
import { loginUser, signup, logoutUser } from '../Controllers/AuthController.js';

const router = express.Router();



router.get('/', async (req,res) => res.send('Auth Route'));

router.post('/register', signup);
router.post('/login', loginUser);
router.post('/logout/', logoutUser);

export default router;
