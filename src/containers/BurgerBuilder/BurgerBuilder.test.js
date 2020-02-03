import { shallow, configure } from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';
import React from 'react';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';

configure({ adapter: new ReactSixteenAdapter() })

describe('<BurgerBuilder />', () => {
    /*  it('', () => {
         expect([1]).toHaveLength(1);
     })  */
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => { }} />);
    });

    it('should have <BuildControls/>', () => {
        wrapper.setProps({ ings: {} })
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })

});