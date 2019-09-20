import React, {Component} from "react";
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css'
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";


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
                <Toolbar opened={this.sideDrawerActionHandler}></Toolbar>
                <SideDrawer open={this.state.showSidebar} closed={this.sideDrawerActionHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}
export default Layout