import React, {Component} from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OderSummary from "../../components/Burger/OderSummary/OderSummary";
import axiosInstance from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 1.5
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        isPurchasing: false,
        loading: false,
        error: false
    };

    updatePurchaseState = () => {
        const ingredients = {...this.state.ingredients};
        const sum = Object.keys(ingredients)
            .map(iKey => {
                return ingredients[iKey]
            })
            .reduce((curSum, el) => {
                return curSum + el;
            }, 0);
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
            ingredients: updatedIngredients,
            totalPrice: newPrice
        }, () => {
            this.updatePurchaseState();
        })

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) return;
        const updateCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updateCount;
        const priceDeduct = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduct;
        this.setState({
            ingredients: updatedIngredients,
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
        /*this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'haresh',
                address: {
                    street: 'Harvey st',
                    zipCode: 5083,
                    country: 'Australia'
                },
                email: 'haresh@haresh.com'
            },
            deliveryMethod: 'Fastest'
        }
        axiosInstance.post('/orders.json', order).then(response => {
            console.log(response)
            this.setState({loading: false, isPurchasing: false});
        }).catch(error => {
            console.log(error)
            this.setState({loading: false, isPurchasing: false});
        });*/
        console.log(this.props);
        let queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        let queryString = queryParams.join('&')
        this.props.history.push(
            {
                pathname: '/checkout',
                search: queryString
            }
            )
    }

    componentDidMount() {
        console.log(this.props)
        axiosInstance.get('https://burgerapp-daae8.firebaseio.com/ingredients.json').then(
            response => {
                this.setState({
                    ingredients: response.data
                })
            }
        ).catch(e => this.setState({error: true}))
    }

    render() {
        console.log(this.props)
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;

        let burger = this.state.error ? <p> Cant fetch the ingredients </p> : (
            <Spinner/>
        );
        if (this.state.ingredients) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        disabledInfo={disabledInfo}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        purchase={this.purchaseHandler}
                    />
                </Auxiliary>
            );
            orderSummary = <OderSummary
                price={this.state.totalPrice}
                ingredients={this.state.ingredients}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            ></OderSummary>;
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>
        }
        return (
            <React.Fragment>
                <Modal show={this.state.isPurchasing} backdropClicked={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;
// export default withErrorHandler(BurgerBuilder, axiosInstance);