import React, {Component} from 'react';
import classes from './Auth.css';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import * as actions from '../../store/actions/index'
import {connect} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Redirect} from "react-router-dom";
import {checkValidity, updatedObject} from "../../shared/utility";

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail:true
                },
                valid: false,
                isTouched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:6
                },
                valid: false,
                isTouched: false
            }
        },
        isSignUp: true
    }



    inputChangeHandler(event, controlName) {
        const updateControls = updatedObject(
            this.state.controls,{
            [controlName]: updatedObject(
                this.state.controls[controlName],{
                    value: event.target.value,
                    valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                    isTouched: true
                })
        });
        this.setState({controls: updateControls});
    }

    submitHanler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value, this.state.isSignUp);

    }

    switchAuthModeHanlder = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        })
    }

    componentDidMount (){
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    render() {
        let formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = formElementArray.map(element => (
            <Input key={element.id}
                   elementType={element.config.elementType}
                   elementConfig={element.config.elementConfig}
                   value={element.config.value}
                   invalid={!element.config.valid}
                   shouldValidate={element.config.validation}
                   isTouched={element.config.isTouched}
                   changed={(event) => this.inputChangeHandler(event, element.id)}/>
            )
        );
        if(this.props.loading){
            form = <Spinner />
        }
        let error = null;
        if(this.props.error){
            error = this.props.error;
        }
        let redirectToHome = null;
        if(this.props.isAuthenticated){
            redirectToHome  = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {redirectToHome}
                {error}
                <form onSubmit={this.submitHanler}>
                    {form}
                    <Button btnType="Success" > Submit </Button>
                </form>
                <Button btnType="Danger"  clicked={this.switchAuthModeHanlder}> Switch to {this.state.isSignUp ? 'SignIn' : 'SignUp'} </Button>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth : (email,password,isSignup) => dispatch(actions.auth(email,password,isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);