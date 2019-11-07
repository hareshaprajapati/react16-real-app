import * as actionTypes from '../actions/actionTypes';
import {updatedObject} from "../../shared/utility";

const initialState = {
    orders: [],
    loading: false,
    purchaged: false
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHAGE_INIT: {
            return updatedObject(state, {purchaged: false})
        }
        case actionTypes.PURCHAGE_ORDER_START: {
            return updatedObject(state, {loading: true})
        }
        case actionTypes.PURCHAGE_ORDER_SUCCESS: {
            const orderData = updatedObject(action.orderData, {id: action.orderId})
            return updatedObject(state,
                {
                    orders: state.orders.concat(orderData),
                    loading: false,
                    purchaged: true
                })
        }
        case actionTypes.PURCHAGE_ORDER_FAILED: {
            return updatedObject(state, {loading: false})
        }
        case actionTypes.FETCH_ORDER_START: {
            return updatedObject(state, {loading: true}
            )
        }
        case actionTypes.FETCH_ORDER_SUCCESS: {
            return updatedObject(state, {
                orders: action.orders,
                loading: false
            })
        }
        case actionTypes.FETCH_ORDER_FAILED: {
            return updatedObject(state, {loading: false})
        }
        default:
            return {...state};
    }
}

export default orderReducer;