import React, { useState, useRef } from 'react'
import { Typography, TextField, Button } from '@material-ui/core'

import useStyles from './styles'
import { updatePost } from '../../actions/posts'

import { useDispatch } from 'react-redux'

const ShareFunction = ({ post }) => {
    const classes=useStyles()
    // const [post, setpost] = useState(post)

    const [showId, setShowId] = useState(false)
    const [formData, setFormData] = useState(post.users)

    const [newId, setNewId] = useState('')

    const dispatch = useDispatch()

    // const [comment, setComment] = useState('')
    const user = JSON.parse(localStorage.getItem('profile')).result._id
    
    const getId = function() {
        setShowId(prev=>!prev)
    }

    const addUser = async (e) => {
        setFormData(prev => [...prev, newId]);
        dispatch(updatePost(post._id, {...post, users: formData }));
    }

    return (
        <div>
            <div className={classes.getIdSection}>
                <Button width='15px' color='primary' variant='contained' onClick={getId}>
                    Show Id
                </Button>
                <Typography style={{ marginLeft: '8px' }} gutterbottom="true" variant='h6'>{showId ? `${user}` : null}</Typography>
            </div>
            {/* <form className={classes.form} >Enter Id</form> */}
            <div className={classes.containIdSection} >
                <TextField className={classes.enterIdSection} variant='outlined' label='Copy user id to add them' value={newId} onChange={(e)=> setNewId(e.target.value)}/>
                <Button className={classes.addIdButton} width='15px' height='auto' color='primary' variant='contained' onClick={addUser}>
                    Add user
                </Button>
            </div>
        </div>
    )
}

export default ShareFunction