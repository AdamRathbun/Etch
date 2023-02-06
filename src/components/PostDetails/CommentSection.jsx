import React, { useState, useRef } from 'react'
import { Typography, TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import CheckIcon from '@material-ui/icons/Check';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import useStyles from './styles'
import { commentPost, updatePost } from '../../actions/posts'

const CommentSection = ({ post }) => {
    const classes=useStyles()
    const [comments, setComments] = useState(post?.comments)
    // const [comment, setComment] = useState('')
    const [comment, setComment] = useState( {content: '', resolved: false} )
    const user = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch()
    const commentsRef = useRef()
    // dispatches each comment to db with user name and comment itself
    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`
        // const newComments = await dispatch(commentPost(finalComment, post._id))
        const newComments = await dispatch(commentPost({content: finalComment, resolved: false}, post._id))

        setComments(newComments)
        // setComment('')
        setComment({content: '', resolved: false})

        // for auto scrolling the comment to most recent
        setTimeout(() => commentsRef.current.scrollIntoView({ behavior: 'smooth' }), 0)
    }


    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterbottom="true" variant='h6'>Comments</Typography>
                    {/* loop over comments and display all of them */}
                    { comments.map((c,i) => (
                        <Typography key={i} gutterbottom="true" variant='subtitle1' >
                            <strong>{i}. {c.content.split(': ')[0]}</strong>
                            { c.content.split(':')[1] }
                            { c.resolved===true && (
                            <CheckIcon className={classes.checkMark}/>
                            )}
                            {/* <Button onClick={handleResolve} color='primary' variant='contained'> Resolve </Button> */}
                            {/* <Button className={classes.resolveBtn} color='primary' variant='contained'> Resolve </Button> */}
                            {/* <CheckCircleOutlineIcon className={classes.resolveBtn} variant='contained' onClick={(e) => { handleComment(e) }}/> */}
                            {/* onChange={(e)=>setPostData({ ...postData, title: e.target.value })} */}
                        </Typography>
                    ))}
                    {/* to help auto scroll to recent comment */}
                    <div ref={commentsRef} />
                </div>
                { user?.result?.name  && (
                    <div style={{ width: '70%' }}>
                    <Typography gutterbottom="true" variant='h6'>Etch a comment</Typography>
                    <TextField fullWidth minRows={4} variant='outlined' multiline value={comment.content} onChange={(e)=> setComment(e.target.value)}
                    />
                    {/* note it's disabled if no comment */}
                    <Button style={{ marginTop: '8px' }} fullWidth disabled={!comment} color='primary' variant='contained' onClick={handleClick}>
                        Comment
                    </Button>
                </div>
                )}
            </div>
        </div>
    )
}

export default CommentSection