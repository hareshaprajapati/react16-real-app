
import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';
import axiosInstance from "../../axios-orders";

export function* purchageBurgerSaga(action) {
    yield put(actions.purchageBurgerStart());
    try {
        const response = yield axiosInstance.post('/orders.json?auth=' + action.token, action.orderData);
        yield put(actions.purchageOrderSuccess(response.data.name, action.orderData))
    } catch (error) {
        yield put(actions.purchageOrderFailed(error))
    }
}