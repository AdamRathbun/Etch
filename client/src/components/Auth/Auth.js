import React, {useState} from 'react'
import {Avatar, Button, Paper, Grid, Typography, Container, TextField} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'

import Input from './Input'
import useStyles from './styles'
import { signin, signup } from '../../actions/auth'

const initialState = { firstName:'', lastName:'', email:'', password:'', confirmPassword:'' }

const Auth = () =>{

    const classes = useStyles()
    const navigate = useNavigate()
    const dispatch=useDispatch()

    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = () => setShowPassword((prevShowPassword)=>!prevShowPassword)

    const [isSignup, setIsSignup] = useState(false)

    const [formData, setFormData] = useState(initialState)


    const handleSubmit=(event)=>{
        // adding an event of preventDefault b.c React refreshes page on default on form submits
        event.preventDefault()
        console.log(formData)

        if(isSignup){
            dispatch(signup(formData, navigate))
        }else{
            dispatch(signin(formData, navigate))
        }
    }

    const handleChange=(event)=>{
        // grab all the other formData properties, but change the one I'm on
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    
    const switchMode=()=>{
        setIsSignup((prevIsSignup)=>!prevIsSignup)
        setShowPassword(false)
    }

    return(
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation = {3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign up' : 'Sign in'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing ={2}>
                    {
                        // if isSignup is true,
                        isSignup && (
                            <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} half/>
                                <Input name='lastName' label='Last Name' handleChange={handleChange} half/>
                            </>
                        )
                    }
                    {/* note all the handleChange are the same, to access the same state field*/}
                    <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                    <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                    {/* also if isSignup is true, */}
                    { isSignup &&  <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}
                </Grid>
                <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                    { isSignup ? 'Sign up' : 'Sign in'}
                </Button>
                <Grid container justifyContent='flex-end'>
                    <Grid item>
                        <Button onClick={switchMode}>
                            { isSignup ? 'Already have an account? Sign in.' : "Don't have an account? Sign up."}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            </Paper>

        </Container>
    )
}

export default Auth