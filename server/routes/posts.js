import express from 'express';
import {getPosts, createPost, updatePost, deletePost, likePost, getPost, commentPost } from '../controllers/posts.js'
import auth from '../middleware/auth.js'

const router = express.Router();

//logic under ../controllers/posts.js this just the route. 
//note urls match client/src/api/index.js

router.get('/', auth, getPosts)

//route for creating posts
router.post('/', auth, createPost)

router.patch('/:id', auth, updatePost)

//only delete posts user created
router.delete('/:id', auth, deletePost)

router.patch('/:id/likePost', auth, likePost)

router.get('/:id', auth, getPost)

router.post('/:id/commentPost', auth, commentPost)

export default router;

