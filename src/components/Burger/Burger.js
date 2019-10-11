import React from 'react';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from './Burger.css';
import {withRouter} from "react-router-dom";

const burger = (props) => {
    // console.log(props);
    /*
    ingredients : {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 2
        }
     */
    let transformedIngredients  = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient type={igKey} key={igKey + i}/>
            })
        }).reduce((previousValue, currentValue) => {
            return previousValue.concat(currentValue);
        }, []);

    if(transformedIngredients.length === 0)
        transformedIngredients = <p>Please add ingredients </p>;

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type={'bread-top'}/>
            {transformedIngredients}
            <BurgerIngredient type={'bread-bottom'}/>
        </div>

    )

};

export default burger;
// export default withRouter(burger);