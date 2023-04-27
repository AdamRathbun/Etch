import axios from 'axios'

//this is connected to the backend routing
const API = axios.create( {baseURL: 'http://localhost:5500'} )

// function that happens on each request. sends token to backend middleware auth to verify we are logged in and the correct user (such as for deleting)
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        // this is the token (JWT)
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

export const fetchPosts = () => API.get('/posts');

// newPost is a callback for the entire new post. in axios, first parameter = url, and second = data I'm sending
export const createPost = (newPost) => API.post('/posts', newPost);

export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

// note these two have to match 'user' in ln25 of server/index.js
export const signin = (formData) => API.post('/user/signin', formData)

export const signup = (formData) => API.post('/user/signup', formData)

export const fetchPost= (id) => API.get(`/posts/${id}`)

export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value })
