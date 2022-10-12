// constants for actions
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_POST, COMMENT } from '../constants/actionTypes.js';

//import everything from ../api as api. can just api.fetchPosts, for example
import * as api from '../api/index.js';

//Action Creators (functions that return actions). 
//async(dispatch) is using thunk to create async await. note exporting to ln6 in src/App.js
//after actions, it's reducers

// export const getPosts = () => async (dispatch) => {
//     try {
//         //from src/api/index.js-->update url later!
//         const { data } = await api.fetchPosts()
        
//         //action must have type property. payload is where the data is stored. in this case, posts data.
//         //dispatch(action) is redux thunk version of return action. as soon as it dispatches, which happens on src/App.js ln 26, within the useEffect(), it goes to reducers/posts.js (which handles the logic of fetching all posts)
//         //shows up as action.type and action.payload. note how this ties to the posts reducer switch case
//         dispatch({ type: FETCH_ALL, payload: data })
//     } catch (error) {
//         console.log(error.message)
//     }
// }

// tied to api/index.js ln 10. tied to components/Form/Form.js
export const createPost = (post) => async (dispatch) => {
    try {
        // post api request to server
        const { data } = await api.createPost(post)

        //payload is all the data
        dispatch({ type: CREATE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        // this is awaiting the api to return the updated project post
        const { data } = await api.updatePost(id, post)

        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        //note no need to log data, just get the right id to delete
        await api.deletePost(id)

        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id)

        dispatch({ type: LIKE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const getPost = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchPost(id)

        dispatch({ type: FETCH_POST, payload: data })
    } catch (error) {
        console.log(error.message)
    }
}

// linked to PostDetails/CommentSection.jsx handleClick's dispatch(commentPost(finalComment, post._id)). note how it passes the comment, then the value of post id
export const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.comment(value, id)

        dispatch({ type: COMMENT, payload: data })

        // return the newest comment
        return data.comments
    } catch (error) {
        console.log(error)
    }
}

// 
// export const updateComment = (id, post) => async (dispatch) => {
//     try {
//         // this is awaiting the api to return the updated project post
//         const { data } = await api.updatePost(id, post)

//         dispatch({ type: UPDATE, payload: data })
//     } catch (error) {
//         console.log(error)
//     }
// }


export const getPosts = () => async (dispatch) => {
    try {
        //from src/api/index.js-->update url later!
        const { data } = await api.fetchPosts()
        
        //action must have type property. payload is where the data is stored. in this case, posts data.
        //dispatch(action) is redux thunk version of return action. as soon as it dispatches, which happens on src/App.js ln 26, within the useEffect(), it goes to reducers/posts.js (which handles the logic of fetching all posts)
        //shows up as action.type and action.payload. note how this ties to the posts reducer switch case
        dispatch({ type: FETCH_ALL, payload: data })
    } catch (error) {
        console.log(error.message)
    }
}

// export const likePost = (id) => async (dispatch) => {
//     try {
//         const { data } = await api.likePost(id)

//         dispatch({ type: LIKE, payload: data })
//     } catch (error) {
//         console.log(error)
//     }
// }