//reducer for auth.
import { AUTH, LOGOUT } from '../constants/actionTypes.js';

//state must always be equal to something. note posts=state in this case since this is for posts
const authReducer = (state={authData:null}, action) => {
    switch (action.type){
        case AUTH:
            // storing login in local storage. note profile linked to Navbar/Navbar.js user
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data };
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null }
        default:
            return state;
    }
} 

export default authReducer
