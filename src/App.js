import React, {Component} from 'react';
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {Redirect, Route, Switch} from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";
import {connect} from "react-redux";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

// lazy loading of a component using asyncComponent function which takes a function as an argument
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
        {/*<Switch> returns only one first matching route., Route is for which url which component to load, Redirect to redirect to any other route*/
        }
        let route = (
            <Switch>
                <Route path="/auth" component={asyncAuth}/>
                <Route path="/" component={BurgerBuilder}/>
                <Redirect to="/"/>
            </Switch>
        );
        if (this.props.isAuthenticated) {
            route = (<Switch>
                    <Route path="/checkout" component={asyncCheckout}/>
                    <Route path="/orders" component={asyncOrders}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/auth" component={asyncAuth}/>
                    <Route path="/" component={BurgerBuilder}/>
                    <Redirect to="/"/>
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
// to dispatch any action from component
const mapDispatchToProps = dispatch => {
    return {
        onTryAuthCheckState: () => dispatch(actions.authCheckState())
    }
}
// connect() connects a React component to a Redux store
export default connect(mapStateToProps, mapDispatchToProps)(App);
