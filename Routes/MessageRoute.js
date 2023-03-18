import express from 'express';
import { createChat, findChat, userChats } from '../Controllers/ChatController.js';
import { addMessage, getMessages } from '../Controllers/MessageController.js';

// import { loginUser, signup, logoutUser } from '../Controllers/AuthController.js';


const router = express.Router();


router.post('/', addMessage);
router.get('/:chatId', getMessages);
router.get('/find/:firstId/:secondId', findChat);







export default router;