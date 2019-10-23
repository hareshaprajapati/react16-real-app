import * as actionTypes from "./actionTypes";
import axiosInstance from "../../axios-orders";

export const addIngredients = (ingName) => {
    return {type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}
};

export const removeIngredients = (ingName) => {
    return {type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}
}

const setIngredients = (ingredients) => {
    return ({
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    })
}

const fetchIngredientsFailed = () =>{
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED
    }
}

export const initIngredients = () => {
  return dispatch => {
      axiosInstance.get('https://burgerapp-daae8.firebaseio.com/ingredients.json').then(
          response => {
            dispatch(setIngredients(response.data))
          }
      ).catch(e => dispatch(fetchIngredientsFailed()))
  }
}