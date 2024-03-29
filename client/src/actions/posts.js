// constants for actions
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_POST, COMMENT } from '../constants/actionTypes.js';

import * as api from '../api/index.js';

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post)

        dispatch({ type: CREATE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)

        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
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

        return data.comments
    } catch (error) {
        console.log(error)
    }
}

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts()
        
        dispatch({ type: FETCH_ALL, payload: data })
    } catch (error) {
        console.log(error.message)
    }
}
