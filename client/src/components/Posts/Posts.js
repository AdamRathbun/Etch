import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, CircularProgress } from '@material-ui/core'

import Post from './Post/Post'

import useStyles from './styles'


const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state)=>state.posts)

    const classes = useStyles()

    return (
        // edit styles under styles file in the Posts folder
        // if no posts, then a loading spinner circularprogress. if there are posts, then show posts
        !posts.length ? <CircularProgress />: (
            <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                {posts.map((post)=>(
                    // has a post ID. xs={12} means full width on mobile devices. 
                    <Grid key={post._id} item xs={12} sm={12}>
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts
