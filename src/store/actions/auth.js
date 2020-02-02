import * as actionTypes from './actionTypes';
import axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSucess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCESS,
        idToken: idToken,
        userId: userId
    }
}


export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }

    /* 
    // redux-thunk
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationTime');
    return {
         type: actionTypes.AUTH_LOGOUT
    }
    */
}

export const logoutSucced = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

// wait for expirytime and then logout the user automaticaly after timeout
export const checkAuthLogout = (expiresIn) => {
    console.log(expiresIn);
    return {
        type: actionTypes.CHECK_AUTH_LOGOUT,
        expiresIn: expiresIn
    }
    /*
    // redux-thunk

     return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expiresIn  * 1000)
    }
    */
}

export const auth = (email, password, isSignup) => {
    return {
        type: actionTypes.AUTH_USER,
        email,
        password,
        isSignup
    }

    /* 
    // redux-thunk
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC-oOYK1_r4WKdjqpVonLC6tJikk5urZhg';
        if(!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC-oOYK1_r4WKdjqpVonLC6tJikk5urZhg';
        }
        // axios to send http call
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                const date = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expirationTime', date);
                dispatch(authSucess(response.data.idToken, response.data.localId));
                dispatch(checkAuthLogout(response.data.expiresIn));
            })
            .catch(error => {
                console.log(error)
                dispatch(authFail(error.response.data.error.message))
            })
    }
    */
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.AUTH_REDIRECT_PATH,
        path: path
    }
}

// check if token and expirationTime is fine then use them and authenticate user otherwise logout them
export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    }

    /* 
    // redux-thunk

     return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout())
        }else{
            const expirationTime = new Date(localStorage.getItem('expirationTime'));
            if(expirationTime < new Date()){
                dispatch(logout());
            }else{
                const userId = localStorage.getItem('userId');
                dispatch(authSucess(token, userId))
                dispatch(checkAuthLogout((expirationTime.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
    */
}