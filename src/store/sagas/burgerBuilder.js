import axiosInstance from "../../axios-orders";
import { put } from 'redux-saga/effects';

import * as actions from '../actions/index'



// eslint-disable-next-line require-yield
export function* initIngredientsSaga(){
    try{
        const response =  yield  axiosInstance.get('https://burgerapp-daae8.firebaseio.com/ingredients.json');
        yield put(actions.setIngredients(response.data))
    }catch(e){
        yield put(actions.fetchIngredientsFailed())
    }
    
}