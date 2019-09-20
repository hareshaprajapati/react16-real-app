import React, {Component} from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OderSummary from "../../components/Burger/OderSummary/OderSummary";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 1.5
}

class BurgerBuilder  extends Component {

    state = {
        ingredients : {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        isPurchasing: false
    };

    updatePurchaseState = () => {
        const ingredients = {...this.state.ingredients};
        const sum = Object.keys(ingredients)
            .map(iKey => {
                return ingredients[iKey]
            })
            .reduce((curSum, el) => {
                return curSum + el;
            } , 0);
        this.setState({purchasable: sum > 0})

    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updateCount;
        const priceAdd = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAdd;
        this.setState({
            ingredients : updatedIngredients,
            totalPrice: newPrice
        }, () => {
            this.updatePurchaseState();
        })

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) return;
        const updateCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updateCount;
        const priceDeduct = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduct;
        this.setState({
            ingredients : updatedIngredients,
            totalPrice: newPrice
        }, () => {
            this.updatePurchaseState();
        });
    }

    purchaseHandler = () => {
        this.setState({isPurchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({isPurchasing: false})
    }

    purchaseContinueHandler = () => {
        alert('You continue');
}

    render(){
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <React.Fragment>
                <Modal show={this.state.isPurchasing} backdropClicked={this.purchaseCancelHandler}>
                    <OderSummary
                        price={this.state.totalPrice}
                        ingredients={this.state.ingredients}
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                    ></OderSummary>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    disabledInfo={disabledInfo}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    purchase={this.purchaseHandler}
                />
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;