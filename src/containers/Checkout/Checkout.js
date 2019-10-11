import React, {Component} from 'react';
import classes from './Checkout.css';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {

    state={
        ingredients: {
            salad : 1,
            meat: 1,
            cheese:2,
            bacon:1
        }
    }

    componentDidMount(){
        console.log(this.props);
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for(let q of query.entries()){
            ingredients[q[0]] = +q[1]
        }
        this.setState({ingredients: ingredients})
    }
    checkoutCancelledHanlder = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHanlder = () => {
        this.props.history.replace('/contact-data');
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                                 checkoutCancelled={this.checkoutCancelledHanlder}
                                 checkoutContinued={this.checkoutContinuedHanlder}
                ></CheckoutSummary>
            </div>
        );
    }
}

export default Checkout;