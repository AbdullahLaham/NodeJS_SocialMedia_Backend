import express from 'express';
import { deleteUser, followUser, getUser, unFollowUser, updateUser } from '../Controllers/UserController.js';
const router = express.Router();

// router.get('/', async (req,res) => res.send('User Route'))

router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.put('/:id/follow', followUser);
router.put('/:id/unfollow', unFollowUser);


// router.post('/login', loginUser)
export default router;