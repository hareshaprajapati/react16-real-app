
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

export function* fetchOrders  (action)  {
    yield put(actions.fetchOrderStart());
        // fetch bu userId  firebase trick
        let query = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
        try{
            const res = yield    axiosInstance.get('/orders.json' + query)
            console.log(res)
            const fetchData = [];
            for(let key in res.data){
                fetchData.push(
                    {
                        ...res.data[key],
                        id:key});
            }
           yield put(actions.fetchOrderSuccess(fetchData));
        }catch(e){
            yield put(actions.fetchOrderFailed(e))
        }
    
 
}