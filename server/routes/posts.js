import express from 'express';
import {getPosts, createPost, updatePost, deletePost, likePost, getPost, commentPost} from '../controllers/posts.js'
import auth from '../middleware/auth.js'

const router = express.Router();

//logic under ../controllers/posts.js this just the route. 
//note urls match client/src/api/index.js

//route for getting posts, need to change from all feed to feed of projects that I'm on. router.get('/:id', getPost) etc.
router.get('/', getPosts)

//route for creating posts
router.post('/', auth, createPost)

//route for updating existing posts. note here it's "patch", not "put". managed on frontend.
// will have logic to only allow updating posts I created. most likely fine to have in addition to common comment objects that allow everyone to comment. id of existing post being updated. 
router.patch('/:id', auth, updatePost)

//route for deleting posts. managed on frontend.
// will have logic for only deleting posts I created
router.delete('/:id', auth, deletePost)

//route for liking project posts. managed on backend.
router.patch('/:id/likePost', auth, likePost)

router.get('/:id', getPost)

//route for creating comments
router.post('/:id/commentPost', auth, commentPost)

export default router;

