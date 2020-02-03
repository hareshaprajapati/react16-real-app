import { shallow, configure } from "enzyme";
// need to import React because we will shallow render react component
import React from 'react';

import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";
import ReactSixteenAdapter from "enzyme-adapter-react-16";

// configure enzyme to connect with React using Adapter
configure({ adapter: new ReactSixteenAdapter() });

// describe a test suite 
describe('<NavigationItems/>', () => {
    let wrapper;
    // run before each test case
    beforeEach(() => {
        //shallow render the component only not the whole child tree
        wrapper = shallow(<NavigationItems />);

    })
    // single test case
    it('should render two NavigationItem', () => {
        // expect the output with condition like toHaveLength or toEqual
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render two NavigationItem', () => {
        wrapper.setProps({ isAuthenticated: true });
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should have logout navigationItem', () => {
        // set props after component is initialized, if some props needed in componentDidMount or any other cycle before render 
        // then need to pass the props in beforeEach method like wrapper = shallow(<NavigationItems isAdmin={true} />)
        wrapper.setProps({ isAuthenticated: true });
        // contains a whole html tag
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
})