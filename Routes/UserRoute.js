import express from 'express';
import { deleteUser, followUser, getUser, unFollowUser, updateUser, getAllUsers } from '../Controllers/UserController.js';
import authMiddleware from '../MiddleWare/authMiddleWare.js';
const router = express.Router();

// router.get('/', async (req,res) => res.send('User Route'))
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id',  authMiddleware ,updateUser);
router.delete('/:id',  authMiddleware ,deleteUser);
router.put('/:id/follow', authMiddleware , followUser);
router.put('/:id/unfollow',  authMiddleware ,unFollowUser);


// router.post('/login', loginUser)
export default router;