//reducer for posts. note I am using this in sibling index.js as combineReducers

import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_POST, COMMENT } from '../constants/actionTypes.js';

//state must always be equal to something. note posts=state in this case since this is for posts. reducer takes in the prev state and an aciton to reduce it to the new instance of state
export default (state={posts:[]}, action) => {
    //switch case for each action.type, will add more logic
    switch (action.type){
        case FETCH_ALL:
            // actions/src/posts.js ln 15
            // return action.payload;
            return {...state, posts: action.payload.data}
        case CREATE:
            return {...state, posts: [...state.posts, action.payload]};
        case UPDATE:
            // map over the posts array with new array. note action.payload is the updated post here. logic = if the post id matches the updated post id, then return the updated post, else return the old post.
            return {...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)}
        case DELETE:
            // filter only posts that don't have an id that matches action.payload
            return {...state, posts: state.posts.filter((post) => post._id !== action.payload)}
        case LIKE:
            return {...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)}
        case FETCH_POST:
            return { ...state, post: action.payload }
        case COMMENT:
            return { ...state, posts: state.posts.map((post) => {
                if(post._id === action.payload._id){
                    return action.payload
                } else {
                    return post  
                }
            })
        }
        default:
            return state;
    }
} 

//note I'm fetching the redux data in (for example) src/components/Post/Posts.js. fetching it from the global redux store with selectors