import React from 'react';
import classes from './SideDrawer.css';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer];
    if(props.open) attachedClasses.push(classes.Open)
    else attachedClasses.push(classes.Close)
    return (
        <Auxiliary>
            <Backdrop show={props.open} backdropClicked={props.closed}></Backdrop>
        <div className={attachedClasses.join(' ')}
        onClick={props.closed}
        >
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav>
                <NavigationItems
                    isAuthenticated={props.isAuthenticated}
                />
            </nav>
        </div>
        </Auxiliary>
    );
};

export default sideDrawer;