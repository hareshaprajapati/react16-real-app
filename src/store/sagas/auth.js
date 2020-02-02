import { put, call } from 'redux-saga/effects'
import { delay } from 'redux-saga/effects';
import axios from "axios";

import * as actions from '../actions/index';

export function* logoutSaga(action) {
    yield call([localStorage,'removeItem'], "token") ;
    // yield localStorage.removeItem('token');
    yield localStorage.removeItem('userId');
    yield localStorage.removeItem('expirationTime');
    yield put(actions.logoutSucced())
}

export function* checkAuthLogoutSaga(action) {
    console.log('waiting ', action.expiresIn)
    yield delay(action.expiresIn * 1000);
    console.log('waiting over', action.expiresIn)
    yield put(actions.logout());
}


export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC-oOYK1_r4WKdjqpVonLC6tJikk5urZhg';
    if (!action.isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC-oOYK1_r4WKdjqpVonLC6tJikk5urZhg';
    }
    try {
        // axios to send http call
        const response = yield axios.post(url, authData);
        yield console.log(response);
        const date = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('userId', response.data.localId);
        yield localStorage.setItem('expirationTime', date);
        yield put(actions.authSucess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthLogout(response.data.expiresIn));
    } catch (err) {
        console.log(err)
        yield put(actions.authFail(err.response.data.error.message))
    }

}

// check if token and expirationTime is fine then use them and authenticate user otherwise logout them
export function* authCheckStateSaga() {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.logout())
    } else {
        const expirationTime = yield new Date(localStorage.getItem('expirationTime'));
        if (expirationTime < new Date()) {
            yield put(actions.logout());
        } else {
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSucess(token, userId))
            yield put(actions.checkAuthLogout((expirationTime.getTime() - new Date().getTime()) / 1000));
        }
    }
}