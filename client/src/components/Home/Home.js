import React, { useEffect, useState } from 'react';
import { Container, Grow, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux';

import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { getPosts } from '../../actions/posts'


const Home = () => {
    // project id, starting with null if id not selected. current id passed to Form below. note the setter is passed to both Posts component and Form component below
    const [currentId, setCurrentId] = useState(0);

    const dispatch=useDispatch()
    //useEffect with dispatch and dispatch dependency array. tied to: ./actions/posts
    useEffect(()=>{
        dispatch(getPosts())
        //note dependency array triggers getPosts refresh on every dispatch and whenever the currentId changes.
    }, [currentId, dispatch])


    return (
        // note Grow is simple animation
        <Grow in>
        <Container>
            {/* note justify replaced with justifyContent. also note the additional class for styles.js just to add styling for mobile */}
            {/* took out className={classes.mainContainer}  */}
            <Grid container justifyContent='space-between' alignItems='stretch' spacing={3}>
                {/* excess 12/12 spaces means full width on extra small devices, 7/12 width on small to medium devices*/}
                <Grid item xs={12} sm={4}>
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={7}>
                    <Posts setCurrentId={setCurrentId}/>
                </Grid>
            </Grid>
        </Container>
        </Grow>
    )
}

export default Home
