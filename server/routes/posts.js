import express from 'express';
import {getPosts, createPost, updatePost, deletePost, likePost} from '../controllers/posts.js'


const router = express.Router();

//logic under ../controllers/posts.js this just the route. 
//note urls match client/src/api/index.js

//route for getting posts
router.get('/', getPosts)

//route for creating posts
router.post('/', createPost)

//route for updating existing posts. note here it's "patch", not "put"
//id of existing post being updated
router.patch('/:id', updatePost)

//route for deleting posts
router.delete('/:id', deletePost)

//route for liking project posts
router.patch('/:id/likePost', likePost)

export default router;

