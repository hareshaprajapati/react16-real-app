import React,{Component} from 'react';
import Auxiliary from "../Auxiliary/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
        state = {
            error: null
        }
        componentWillMount(){
           this.reqInterceptor =  axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request;
            });
            this.resInterceptor =  axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            })
        }

        componentWillUnmount(){
            axios.interceptors.response.eject(this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render(){
            return <Auxiliary>
                <Modal show={this.state.error}
                       backdropClicked={this.errorConfirmedHandler}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent/>
            </Auxiliary>
        }
    }
};

export default withErrorHandler;