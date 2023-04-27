import { combineReducers } from "redux";

//importing posts reducer from posts.js 
import posts from './posts'
// importing auth reducer
import auth from './auth'
// importing comment reducer
import postC from './postC'

export default combineReducers({ posts, auth, postC })
