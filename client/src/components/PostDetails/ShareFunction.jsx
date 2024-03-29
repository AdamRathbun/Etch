import React, { useState, useRef } from 'react'
import { Typography, TextField, Button } from '@material-ui/core'

import useStyles from './styles'
import { updatePost } from '../../actions/posts'

import { useDispatch } from 'react-redux'

const ShareFunction = ({ post, userId }) => {
    const classes=useStyles()

    const [showId, setShowId] = useState(false)
    const [formData, setFormData] = useState(post.users)

    const [newId, setNewId] = useState('')

    const dispatch = useDispatch()

    const user = userId

    const getId = function() {
        setShowId(prev=>!prev)
    }

    const addUser = () => {
        dispatch(updatePost(post._id, {...post, users: formData }));
    }

    return (
        <div>
            <div className={classes.containIdSection} >
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
