import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import useStyles from './styles'
import { createPost, updatePost } from '../../actions/posts'


const Form = ({ currentId, setCurrentId }) => {
    // note selectedFile is image converted to string. all properties start as empty strings
    const [postData, setPostData] = useState({
        title:'', message: '', tags: '', selectedFile: '', comments:[], width: 0, height:0, version: 1,
    })
    // const [dimensions, setDimensions] = useState({width: 0, height:0})


    // for Form. if there's a currentId, this looks for the post with a matching id to currentId, else null. this returns a single post that matches the currentId.
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null)
    // when the post value changes from nothing to the actual post, run this function. if post exists, then setPostData and populate it with the data of the post.
    // this combined with above makes it so that when I (click on the elipsis to update), that it auto populates the form with the post data with an id matching the currentId
    useEffect(() => {
        if(post) setPostData(post)
    }, [post])

    //dispatch actions
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const classes = useStyles()

    const user = JSON.parse(localStorage.getItem('profile'))

    //tied to submit button > onSubmit for the form. tied to api/index.js and actions/posts.js
    //note after action is dispatched, we go to reducers/posts.js
    const handleSubmit = (e) => {
        //prevent refresh in browser
        e.preventDefault();
        // redux. if currentId is known, update. else, create. note currentId is the first parameter of updatePost so it knows which one to update. note clear function called after each submit/update of a post.
        if(currentId===0){
            // spread out the postData. grabs it from localStorage (see user variable above), then saves the name from the localStorage as the name in the database
            dispatch(createPost({...postData, name: user?.result?.name }));
            clear();
        } else {
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name }));
            clear();
        }
        // navigate('/')
        // window.location.reload()
    }

    if (!user?.result?.name){
        return (
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    Sign in to create projects.
                </Typography>
            </Paper>
        )
    }

    // for clear button
  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: '', selectedFile: '', width: 0, height:0, version: 1 });
  };

// 9.26

// const getDimensions = (base64) => {
//     let i = new Image(); 

//     i.onload = function(){
//      alert( i.width+", "+i.height );
//     };
    
//     i.src = base64;
// }
const getDimensions = (base64) => {
    let i = new Image(); 

    i.onload = function(){
      if (i.height>=600){
        const proportions = Number((i.height/600).toFixed(6))
        i.height=600
        i.width=i.width/proportions + 1
        setPostData( prev => {
            return {...prev, width:i.width, height:i.height}
            });
      }else{
        setPostData( prev => {
            return {...prev, width:i.width, height:i.height}
            });
      }
    };
    
    i.src = base64;
}

// console.log(postData.width, postData.height)

    return (
        //Paper is like a form with a white background
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
                {/* ternary for displaying Creating vs Editing a project */}
                <Typography variant='h6'>{currentId ? 'Edit' : 'Create'} a project</Typography>
                {/* remember the entire data from post stored in the postData object and each of that object is a specific text field. The onChange copies over previous state and only changes creator property's value. can similary do for other properties. it sets the state using an object*/}
                <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e)=>setPostData({ ...postData, title: e.target.value })} />
                <TextField name='message' variant='outlined' label='Message' fullWidth value={postData.message} onChange={(e)=>setPostData({ ...postData, message: e.target.value })} />
                {/* note the tags apply split(). users separate with comma no space */}
                <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e)=>setPostData({ ...postData, tags: e.target.value.split(',') })} />
                {/* for the image */}
                <div className={classes.fileInput}>
                    <FileBase 
                        id='submitImg'
                        type='file'
                        multiple={false}
                        onDone={({base64}) => {
                            getDimensions(base64)
                            setPostData({ ...postData, selectedFile: base64, width: postData.width, height: postData.height })}}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                <Typography variant='p' className={classes.instructions} >
                    {/* Instructions: Login first. Input projects details including image. Click on a project to open it up, with markup tools and comments below the image. Can share project with additional users by entering the ID into "Add User" field. */}

                    <strong>Instructions:</strong> Add image to project. Click project to open it with markup tools & comments. Share project by entering friend's ID into "Add User".
                </Typography>
            </form>
        </Paper>
        
    )
}

export default Form


// more

// var i = new Image(); 

// i.onload = function(){
//  alert( i.width+", "+i.height );
// };

// i.src = imageData; 