import React, {useEffect, useState} from 'react'
import { Paper, Typography, CircularProgress, Divider, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useParams, useNavigate } from 'react-router-dom'

import useStyles from './styles'
import { getPost } from '../../actions/posts'
import CommentSection from './CommentSection'
import { updatePost } from '../../actions/posts'

import Canvas from './Canvas'

const PostDetails = () => {

    // get all the post data from the useSelector. get the state.posts reducer
    const { post, posts, isLoading } = useSelector((state)=>state.posts)

    const [comments, setComments] = useState(post?.comments)

    // for image version control
    const [version, setVersion] = useState(post?.version)

    const userId = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')).result._id : null

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const classes = useStyles()
    // project id
    const { id } = useParams()

    useEffect(()=>{
        dispatch(getPost(id))
    }, [id])

    useEffect(()=>{
        if(comments){
            dispatch(updatePost(post._id, {...post, comments: post.comments}));
        }
    }, [comments])

    if(!post) return null;

    if(isLoading){
        return <Paper elevation={6} className={classes.loadingPaper}>
            <CircularProgress size='7em'/>
        </Paper>
    }

console.log(post.users)

    return(
    <Paper style={{ padding: '20px', borderRadius:'15px' }} elevation= {6}>
        <div className={classes.card}>
            <div className={classes.section}>
                <Typography variant="h3" component="h2">{post.title}</Typography>
                <Typography gutterbottom="true" variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                <Typography gutterbottom="true" variant="body1" component="p">{post.message}</Typography>
                <Typography variant="h6">Created by: {post.name}</Typography>
                <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                <Divider style={{ margin: '20px 0' }} />
            </div>
        {/* image */}
        <div className={classes.imageSection}>
          <Canvas post={post} comments={comments} version={version}/>
        </div>
        <div>
        <Divider style={{ margin: '20px 0' }} />
                {/* comment section */}
                <CommentSection post={post}/>
        <Divider style={{ margin: '20px 0' }} />
        </div>
      </div>
    </Paper>
    )
}

export default PostDetails
