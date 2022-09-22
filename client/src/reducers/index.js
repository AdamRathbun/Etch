import { combineReducers } from "redux";

//importing posts reducer from posts.js 
import posts from './posts'
// importing auth reducer
import auth from './auth'

import postC from './postC'

//exporting to index.js ln9
//note currently only have one reducer (posts). Note posts essentially means posts: posts
export default combineReducers({ posts, auth, postC })