import React, { useState, useEffect } from 'react'
import { AppBar, Typography, Avatar, Toolbar, Button } from '@material-ui/core'
import useStyles from './styles'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'

//for the header image next to Etch header
import projectImg from '../../images/etch.png'


const Navbar = () => {
    const classes = useStyles()
    // history is now navigate and it redirects to another url
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    // linked to reducers/auth.js
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const logout = () => {
        dispatch({type:'LOGOUT'})
        setUser(null)
        navigate('/')
    }
    
    useEffect(()=>{

        const token = user?.token;

        if(token){
            const decodedToken=decode(token)

            // if token expiration is less than current time, trigger a logout()
            if(decodedToken.exp*1000 < new Date().getTime()) logout()
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])
    // ^useLocation triggers on any URL change, but for some reason the code keeps bugging me about it

    return(

        <AppBar className={classes.appBar} position='static' color='inherit'>
        <div className={classes.brandContainer}>
            {/* component Link points to home with '/' route */}
            <Typography component={Link} to='/' className={classes.heading} variant='h2' align='center'>Etch</Typography>
            {/* note change below when I can start Etch projects */}
            <img className={classes.image} src={projectImg} alt='Etch Project' height='51'></img>
        </div>
        <Toolbar className={classes.toolbar}>
            {/* if user logged in/unlogged */}
            {user ? (
                <div className={classes.profile}>
                    {/* show avatar, or if none then first letter of name */}
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imgUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant = 'h6'>{user.result.name}</Typography>
                    <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
                </div>
            ) : (
                <Button component={Link} to='/auth' variant='contained' color='primary'>Sign in</Button>
            ) }
        </Toolbar>
        </AppBar>
    )
}

export default Navbar;