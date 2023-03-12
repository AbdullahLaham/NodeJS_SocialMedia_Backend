import express from 'express';
import { createPost, getPost, updatePost, deletePost } from '../Controllers/PostController.js';
const router = express.Router();
router.get('/', (req, res) => res.json('post Route'));
router.post('/:id', createPost);
router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;