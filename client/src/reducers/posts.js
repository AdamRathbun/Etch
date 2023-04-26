//reducer for posts. note I am using this in sibling index.js as combineReducers

import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_POST} from '../constants/actionTypes.js';

export default (posts=[], action) => {
    switch (action.type){
        case FETCH_ALL:
            // actions/src/posts.js ln 15
            return action.payload;
        case CREATE:
            return [...posts, action.payload];
        case UPDATE:
            // map over the posts array with new array. note action.payload is the updated post here.
            return posts.map((post) => post._id === action.payload._id ? action.payload : post)
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);
        case LIKE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post)
        case FETCH_POST:
            return { ...posts, post: action.payload }
        default:
            return posts;
    }
} 

