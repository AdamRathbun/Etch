import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, CircularProgress } from '@material-ui/core'

import Post from './Post/Post'

import useStyles from './styles'


const Posts = ({ setCurrentId }) => {
    //initialize selector as a hook. now can access redux store, i.e. state. it's called state.posts b.c in src/reducers/index.js, it's exported as posts
    const posts = useSelector((state)=>state.posts)

    const classes = useStyles()

    return (
        // edit styles under styles file in the Posts folder
        // if no posts, then a loading spinner circularprogress. if there are posts, then show posts
        !posts.length ? <CircularProgress />: (
            <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                {/* remember {} is to indicate JS logic */}
                {posts.map((post)=>(
                    // has a post ID. xs={12} means full width on mobile devices. also note the () instead of {} above
                    <Grid key={post._id} item xs={12} sm={12}>
                        {/* post prop. sends the value of each post to each post component through map method. also is passed setCurrentId */}
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts