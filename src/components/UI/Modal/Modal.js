import React, {Component} from 'react';
import classes from './Modal.css';
import Backdrop from "../Backdrop/Backdrop";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";

class  Modal extends Component {


    shouldComponentUpdate(nextProps, nextState){
        return this.props.show !== nextProps.show;
    }

    componentDidUpdate(){
        console.log('Model updating')
    }

    render(){
        return (
                <Auxiliary>
                    <Backdrop show={this.props.show} backdropClicked={this.props.backdropClicked}></Backdrop>
                    <div
                        className={classes.Modal}
                        style={{
                            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                            opacity: this.props.show ? '1' : '0'
                        }}>
                        {this.props.children}
                    </div>
                </Auxiliary>
        );
    }
}

export default Modal;