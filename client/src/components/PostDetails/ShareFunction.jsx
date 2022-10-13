import React, { useState, useRef } from 'react'
import { Typography, TextField, Button } from '@material-ui/core'

import useStyles from './styles'
import { updatePost } from '../../actions/posts'

import { useDispatch } from 'react-redux'

const ShareFunction = ({ post, userId }) => {
    const classes=useStyles()
    // const [post, setpost] = useState(post)

    const [showId, setShowId] = useState(false)
    const [formData, setFormData] = useState(post.users)

    const [newId, setNewId] = useState('')

    const dispatch = useDispatch()

    // const [comment, setComment] = useState('')
    // const user = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')).result._id : null
    // console.log(userA)
    const user = userId

    const getId = function() {
        setShowId(prev=>!prev)
    }

    const addUser = () => {
        // setFormData(prev => [...prev, newId]);
        dispatch(updatePost(post._id, {...post, users: formData }));
        // alert('User added!')
    }
    // console.log(post.users)
    // console.log(formData)
    return (
        <div>
            {/* <form className={classes.form} >Enter Id</form> */}
            <div className={classes.containIdSection} >
                {/* <TextField className={classes.enterIdSection} variant='outlined' label='Copy user id to add them' value={newId} onChange={(e)=> setNewId(e.target.value)}/> */}
                <Button className={classes.addIdButton} height='auto' color='primary' variant='contained' onClick={addUser}>
                    Add user
                </Button>
                <TextField className={classes.enterIdSection} variant='outlined' label='Copy User ID Here' onChange={(e)=> setFormData(prev => [...prev, e.target.value])}/>
            </div>

            <div className={classes.containIdSection}>
                <Button className={classes.showIdButton} color='primary' variant='contained' onClick={getId}>
                    Show Id
                </Button>
                <Typography className={classes.getIdSection} gutterbottom="true" variant='h6'>{showId ? `${user}` : null}</Typography>
            </div>
        </div>
    )
}

export default ShareFunction