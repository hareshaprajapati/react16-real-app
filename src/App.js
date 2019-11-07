import React, {Component} from 'react';
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {Redirect, Route, Switch} from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";
import {connect} from "react-redux";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(() => {
        return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
    return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
    return import('./containers/Auth/Auth');
});

class App extends Component {

    componentDidMount() {
        this.props.onTryAuthCheckState();
    }

    render() {
        let route = (
            <Switch>
                <Route path="/auth" component={asyncAuth}/>
                <Route path="/"  component={BurgerBuilder}/>
                <Redirect to="/" />
            </Switch>
        );
        if(this.props.isAuthenticated){
            route = (  <Switch>
                <Route path="/checkout" component={asyncCheckout}/>
                <Route path="/orders" component={asyncOrders}/>
                <Route path="/logout" component={Logout}/>
                    <Route path="/auth" component={asyncAuth}/>
                    <Route path="/"  component={BurgerBuilder}/>
                <Redirect to="/" />
            </Switch>
            );
        }
        return (
            <div>
                <Layout>
                    {route}

                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAuthCheckState : () =>  dispatch(actions.authCheckState())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
