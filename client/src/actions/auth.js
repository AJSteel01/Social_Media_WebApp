import { AUTH } from '../constants/actionTypes';
import * as api from '../api';


export const signin = (formData,history) => async(dispatch) =>{
    try {
        //log in the user

        const { data } = await api.signIn(formData);
        
        dispatch({type : AUTH, data});
        
        history.push('/');
    } catch (error) {
        alert("Please Check Your Credentials");
        console.log(error);
    }
};

export const signup = (formData,history) => async(dispatch) =>{
    try {
        //sign up in the user

        const { data } = await api.signUp(formData);
        
        dispatch({type : AUTH, data});
        history.push('/');
    } catch (error) {
        alert('There was some problem with sign up');
        console.log(error);
    }
};