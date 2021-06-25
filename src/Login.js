import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import {auth,provider} from './firebase.js';
import './Login.css';
import { actionTypes } from './reducer.js';
import { useStateValue } from './StateProvider';


function Login() {
    const [{user}, dispatch] = useStateValue();
    const login = ()=>{
        auth.signInWithPopup(provider).then(result=>{
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            })
        }).catch((error) =>{alert(error.message)})
    };
    return (
        <div className="Login">
            <div className="login_container">

                <img src="https://wiproo.com/wp-content/uploads/2015/06/WhatsApp.png"/>
                <h2>Signin to whatsapp</h2>
                <Button onClick={login}>Sign in with Google</Button>
            </div>
        </div>
    )
}

export default Login
