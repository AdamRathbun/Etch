import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import useStyles from './styles'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'

// these 2 are tied to buttons below
import { deletePost, likePost } from '../../../actions/posts'

import baseImg from '../../../images/baseImg.jpg'

import ShareFunction from '../../PostDetails/ShareFunction'

const Post = ( {post, setCurrentId} ) => {
    const classes = useStyles()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem('profile'))

    const userId = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')).result._id : 'Not logged in.'

    const openPost = () => { navigate(`/posts/${post._id}`) }

    return (
       <Card className={classes.card}>  
        <ButtonBase className={classes.cardAction} onClick={openPost}>
            {/* this is an img, linked to the uploaded image selectedFile */}
            <CardMedia className={classes.media} image={post.selectedFile || baseImg} title={post.title}/>
            <div className={classes.overlay}>
                {/* post creator */}
                <Typography variant='h6'>{post.name}</Typography>
                 {/* post creation timestamp */}
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.details}>
                {/* for post tags */}
                <Typography variant='body2' color='textSecondary'>{post.tags.map((tag)=>`#${tag} `)}</Typography>
            </div>
                {/* for post title */}
                <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
                <CardContent>
                    {/* for post message */}
                    <Typography variant='body2' color='textSecondary' component='p' >{post.message}</Typography>
                </CardContent>
        </ButtonBase>
                <div>
                    <ShareFunction post={post} userId={userId} />
                </div>
                {/* like button (and count) and delete button */}
                <CardActions className={classes.cardActions}>
                    <Button size='medium' color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                        <ThumbUpAltIcon fontSize='medium' />
                        {/* &nbsp; is code for space */}
                        &nbsp; Approve &nbsp;
                        {post.likes.length}
                    </Button>
                    {/* for deleting posts. only creator can delete */}
                    {(user?.result?._id===post?.creator) && (
                    <Button size='medium' color="primary" onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize='medium' />
                    &nbsp; Delete
                    </Button>
                    )}
                </CardActions>
       </Card>
    )
}

export default Post
