import React, {Component} from 'react';
import classes from './ContactData.css';
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import {connect} from "react-redux";

import * as orderActions from '../../store/actions/index'
import {checkValidity, updatedObject} from "../../shared/utility";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                isTouched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                isTouched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your ZipCode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                isTouched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                isTouched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                isTouched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'cheapest',
                validation: {},
                valid: true,
                isTouched: false
            }
        },
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props);
        this.setState({loading: true});
        let formData = {};
        for (let formElement in this.state.orderForm) {
            formData[formElement] = this.state.orderForm[formElement].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData,
            userId: this.props.userId
        }
        /*axiosInstance.post('/orders.json', order).then(response => {
            console.log(response)
            this.setState({loading: false});
            this.props.history.push('/');
        }).catch(error => {
            console.log(error)
            this.setState({loading: false});
        });*/
        this.props.onPurchageBurger(order, this.props.token);
    }

    render() {
        let formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                key: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>

                {formElementArray.map(element => {
                    return <Input key={element.key} elementType={element.config.elementType}
                                  elementConfig={element.config.elementConfig}
                                  value={element.config.value}
                                  invalid={!element.config.valid}
                                  shouldValidate={element.config.validation}
                                  isTouched={element.config.isTouched}
                                  changed={(event) => this.inputChangeHandler(event, element.key)}/>
                })}
                <Button btnType='Success' disabled={!this.state.formIsValid}>Order</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner></Spinner>
        }
        return (
            <div className={classes.ContactData}>
                <h4> Conact Data</h4>
                {form}
            </div>

        );
    }

    inputChangeHandler(event, key) {
        const updatedFormElement = updatedObject(this.state.orderForm[key],
            {
                value : event.target.value,
                valid : checkValidity(event.target.value, this.state.orderForm[key].validation),
                isTouched : true
            }
            )
        const updatedForm = updatedObject(this.state.orderForm,
            {
                [key]: updatedFormElement
            });
        let formIsValid = true;
        for (let e in updatedForm) {
            if (!updatedForm[e].valid && updatedForm[e].validation) {
                formIsValid = false
                break;
            }
        }
        this.setState({orderForm: updatedForm, formIsValid: formIsValid})
    }

}


const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onPurchageBurger: (orderData, token) => dispatch(orderActions.purchageBurger(orderData, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axiosInstance));