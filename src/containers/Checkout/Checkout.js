import React, {Component} from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../ContactData/ContactData";
import {Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from '../../store/actions/index'


class Checkout extends Component {


    componentWillMount(){
        // this.props.onPurchageInit();
       /* console.log(this.props);
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for(let q of query.entries()){
            if(q[0] == 'totalPrice') this.setState({totalPrice: q[1]})
                else
            ingredients[q[0]] = +q[1]
        }
        this.setState({ingredients: ingredients})*/
    }
    checkoutCancelledHanlder = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHanlder = () => {
        this.props.history.replace(this.props.match.path + '/contact-data');
    }

    render() {
        console.log(this.props.match.path);
        let summary = (<Redirect to='/'/>);
        if(this.props.ings){
            // if purchasing if finished then redirect it to home page
            const redirect = this.props.purchaged ? <Redirect to='/'/> : null;
            summary = (<div>
                {redirect}
                <CheckoutSummary ingredients={this.props.ings}
                                 checkoutCancelled={this.checkoutCancelledHanlder}
                                 checkoutContinued={this.checkoutContinuedHanlder}
                ></CheckoutSummary>

                {/*<Route path={this.props.match.path + '/contact-data'}
                render={(props) => (<ContactData totalPrice={this.state.totalPrice} ingredients={this.props.ings} {...props}/>)}
                       // component={ContactData}
                ></Route>*/}
                <Route path={this.props.match.path + '/contact-data'}
                       component={ContactData}
                    // component={ContactData}
                ></Route>
            </div>);
        }
        return summary;
    }
}


const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchaged: state.order.purchaged
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onPurchageInit: () => dispatch(actions.purchageInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);