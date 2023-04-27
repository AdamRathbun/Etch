import { COMMENT } from '../constants/actionTypes.js';


export default (state={posts:[]}, action) => {
    switch (action.type){

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

