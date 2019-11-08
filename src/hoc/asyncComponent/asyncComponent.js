import React, {Component} from 'react';

// lazy loading of a component  takes a function as an argument and return the required class to be loaded by calling import() function
const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount() {
            importComponent()
                .then(comp => {
                   this.setState({component: comp.default})
                });
        }

        render() {
            const COMPONENT = this.state.component;
            return COMPONENT ? <COMPONENT {...this.props} /> : null;

        }

    }
}

export default asyncComponent;