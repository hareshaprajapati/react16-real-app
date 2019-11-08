import * as actionTypes from '../actions/actionTypes';
import {updatedObject} from "../../shared/utility";

const initialState = {
    ingredients: null,
    totalPrice: 4,
    loading: false,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 1.5
};

const addIngredients = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const updatedIngredients = updatedObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updatedObject(state, updatedState);
};

const removeIngredients = (state, action) => {
    const removedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const updatedIngredients1 = updatedObject(state.ingredients, removedIngredient);
    const updatedState1 = {
        ingredients: updatedIngredients1,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updatedObject(state, updatedState1);
}

const setIngredient = (state,action) => {
    return updatedObject(state,
        {
            ingredients: {
                salad: action.ingredients.salad,
                bacon: action.ingredients.bacon,
                cheese: action.ingredients.cheese,
                meat: action.ingredients.meat
            },
            totalPrice: 4,
            error: false,
            building: false
        }
    );
};

const fetchIngredientFailed = (state,action) => {
    return updatedObject(state,
        {error: true})
};

// update the state by action which will have all the required information to be updated and return the state

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredients(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredients(state, action);
        case actionTypes.SET_INGREDIENT: return setIngredient(state, action);
        case actionTypes.FETCH_INGREDIENT_FAILED: return fetchIngredientFailed(state,action);
        default:
            return state
    }
};
export default reducer;