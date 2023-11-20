import React, { useState} from 'react';
import {Avatar, Button, Paper, Grid, Typography, Container, TextField} from '@material-ui/core';
import { GoogleLogin} from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Icon from './icon.js';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input.js';
import useStyles from './styles.js';
// import { AUTH } from '../../constants/actionTypes.js';
import { signin,signup } from '../../actions/auth.js';

const initialState={firstName: '', lastName: '', email:'',password:'',confirmPassword:''};

export const Auth = () => {
    const classes=useStyles();
    const dispatch =useDispatch();
    const [showPassword, setShowPassword]=useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData,setFormData] = useState(initialState);
    const history=useHistory();


    const handleShowPassword = () => setShowPassword((prevShowPassword)=> !prevShowPassword)
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formData,history));
        }else{
            dispatch(signin(formData,history));
        }
    };

    const handleChange =(e)=> {
        setFormData({...formData,[e.target.name]: e.target.value});
    };

    const switchMode= () => {
        setIsSignup ((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };
  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h5'>{isSignup ? 'Sign up' : 'sign in' }</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange}  half />
                            </>
                        )
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text":"password"} handleShowPassword={handleShowPassword}/>
                    { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} />}
                </Grid>
                    {/* <GoogleLogin 
                        clientId="GOOGLE ID"
                        render={(renderProps)=>(
                            <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Google Sign In
                            </Button>
                        )}
                    /> */}
                    <Button type="submit" fullWidth variant="contained" color ="primary" className={classes.submit}>
                        {isSignup ? 'Sign up': 'Sign In'}
                    </Button>
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already Have an Account ? Sign In' : 'Dont have a account sign up'}
                            </Button>
                        </Grid>
                    </Grid>
            </form>
        </Paper>
    </Container>
  );
};

export default Auth;
