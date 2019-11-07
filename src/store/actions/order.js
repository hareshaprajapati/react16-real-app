import * as actionTypes from "./actionTypes";
import axiosInstance from "../../axios-orders";

export const purchageOrderSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHAGE_ORDER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};
export const purchageOrderFailed = (error) => {
    return {
        type: actionTypes.PURCHAGE_ORDER_FAILED,
        error: error
    }
}

export const purchageBurgerStart = () => {
    return {
        type: actionTypes.PURCHAGE_ORDER_START
    }
}

export const purchageInit = () => {
    return {
        type: actionTypes.PURCHAGE_INIT
    }
}

export const purchageBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchageBurgerStart());
        axiosInstance.post('/orders.json?auth=' + token, orderData).then(response => {
            dispatch(purchageOrderSuccess(response.data.name, orderData))
        }).catch(error => {
            dispatch(purchageOrderFailed(error))
        });
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAILED,
        error: error
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        let query = '?auth=' + token + '&orderBy="userId"&equalTo="' +userId + '"';
        axiosInstance.get('/orders.json' + query).then(res => {
            console.log(res)
            const fetchData = [];

            for(let key in res.data){
                fetchData.push(
                    {
                        ...res.data[key],
                        id:key});
            }
           dispatch(fetchOrderSuccess(fetchData));
        }).catch(e => dispatch(fetchOrderFailed(e)))
    }
}