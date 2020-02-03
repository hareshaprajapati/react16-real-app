import React, {Component} from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OderSummary from "../../components/Burger/OderSummary/OderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import {connect} from "react-redux";
import * as actions from "../../store/actions/index";


export class BurgerBuilder extends Component {

    state = {
        isPurchasing: false,
        loading: false,
        error: false
    };

    updatePurchaseState() {
        const ingredients = {...this.props.ings};
        const sum = Object.keys(ingredients)
            .map(iKey => {
                return ingredients[iKey]
            })
            .reduce((curSum, el) => {
                return curSum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({isPurchasing: true})
        }else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({isPurchasing: false})
    }

    purchaseContinueHandler = () => {
        let queryParams = [];
        for(let i in this.props.ings){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]))
        }
        queryParams.push('totalPrice=' + this.props.totalPrice)
        // let queryString = queryParams.join('&');
        this.props.onPurchageInit();
        // goto checkout route
        this.props.history.push(
            {
                pathname: '/checkout',
                // search: queryString
            }
            );
    };

    componentDidMount() {
        // axiosInstance.get('https://burgerapp-daae8.firebaseio.com/ingredients.json').then(
        //     response => {
        //         this.setState({
        //             ingredients: response.data
        //         })
        //     }
        // ).catch(e => this.setState({error: true}))
        this.props.onInitIngredients();
    }

    render() {
        const disabledInfo = {...this.props.ings};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;

        let burger = this.props.error ? <p> Cant fetch the ingredients </p> : (
            <Spinner/>
        );
        if (this.props.ings) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        disabledInfo={disabledInfo}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState()}
                        purchase={this.purchaseHandler}
                        isAuthenticated={this.props.isAuthenticated}
                    />
                </Auxiliary>
            );
            orderSummary = <OderSummary
                price={this.props.totalPrice}
                ingredients={this.props.ings}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            ></OderSummary>;
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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredients(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredients(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchageInit: () => dispatch(actions.purchageInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axiosInstance ));