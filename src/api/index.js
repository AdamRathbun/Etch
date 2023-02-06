import axios from 'axios'

//this is connected to the backend routing, will need to change later. 
const API = axios.create( {baseURL: 'http://localhost:5500'} )

// function that happens on each request. sends token to backend middleware auth to verify we are logged in and the correct user (such as for deleting)
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        // this is the token (JWT). must be written like this, starting with Bearer.
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

export const fetchPosts = () => API.get('/posts');
// export const fetchPosts = (id) => API.get(`/posts/${id}`);

// newPost is a callback for the entire new post. in axios, first parameter = url, and second = data I'm sending
//tied to actions/posts.js ln22 and components/Form/Form.js ln22
export const createPost = (newPost) => API.post('/posts', newPost);

// for updating a project post. note id is just the random name I give to the first parameter that will be the id. also, I must define the url with the post id and then send the updatedPost to that url
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);

//for deleting a project post.
export const deletePost = (id) => API.delete(`/posts/${id}`);

//for liking a project post.
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

// note these two have to match 'user' in ln25 of server/index.js
export const signin = (formData) => API.post('/user/signin', formData)

export const signup = (formData) => API.post('/user/signup', formData)

export const fetchPost= (id) => API.get(`/posts/${id}`)

// passes the value of the comment in second parameter
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value })
