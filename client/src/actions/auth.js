import { AUTH } from '../constants/actionTypes.js';
import * as api from '../api/index.js';

export const signin = (formData, navigate) => async (dispatch) => {
    try {        
        // process: initial formData state is a bunch of empty strings for the user, so it dispatches a request to the db to grab some info via the api signin. it saves it as data, then dispatches it
        const { data } = await api.signin(formData)
        
        dispatch({ type: AUTH, data })

        navigate('/')
    } catch (error) {
        console.log(error.message)
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signup(formData)

        dispatch({ type: AUTH, data })

        navigate('/')
    } catch (error) {
        console.log(error.message)
    }
}
