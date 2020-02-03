import { all, takeEvery, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { authCheckStateSaga, authUserSaga, checkAuthLogoutSaga, logoutSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import {purchageBurgerSaga, fetchOrders} from './order'


export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.CHECK_AUTH_LOGOUT, checkAuthLogoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ]);
    takeLatest(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
}

export function* watchBurerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga)
}

export function* watchOrder() {
    yield takeEvery(actionTypes.PURCHAGE_BURGER, purchageBurgerSaga)
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrders)
}