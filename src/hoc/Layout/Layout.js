import React, {Component} from "react";
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css'
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import {connect} from "react-redux";


class Layout extends Component {

    state = {
        showSidebar : false
    }

    sideDrawerActionHandler = () => {
        this.setState((prevState,props) => {
            return {showSidebar: !prevState.showSidebar}
        })
    }

    render() {
       return (
            <Aux>
                <Toolbar
                    isAuthenticated={this.props.isAuthenticated}
                    opened={this.sideDrawerActionHandler}></Toolbar>
                <SideDrawer
                    isAuthenticated={this.props.isAuthenticated}
                    open={this.state.showSidebar} closed={this.sideDrawerActionHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout)