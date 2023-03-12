import express from 'express';
import { loginUser, signup } from '../Controllers/AuthController.js';
const router = express.Router();

router.get('/', async (req,res) => res.send('Auth Route'))
router.post('/register', signup)
router.post('/login', loginUser)
export default router;