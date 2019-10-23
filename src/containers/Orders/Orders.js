import React, {Component} from 'react';
import classes from './Orders.css';
import Order from "../../components/Order/Order";
import axiosInstance from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index'
import {connect} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
class Orders extends Component {

    state = {
    }

    componentDidMount = () => {
        /*axiosInstance.get('/orders.json').then(res => {
            console.log(res)
            const fetchData = [];

            for(let key in res.data){
                fetchData.push(
                    {
                        ...res.data[key],
                    id:key});
            }
            console.log(fetchData)
            this.setState({loading: false, fetchedOrders: fetchData})
        }).catch(e => this.setState({loading: false}))*/
        this.props.onFetchOrders();
    }

    render() {
        let orders = <Spinner />
        if(!this.props.loading){
            orders = this.props.orders.map( o => {
                return  <Order ingredients={o.ingredients} key={o.id} price={o.price}/>
            })
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders,axiosInstance));