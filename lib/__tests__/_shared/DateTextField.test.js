import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { shallow, utilsToUse } from '../test-utils';
import { DateTextField } from '../../src/_shared/DateTextField';

describe('DateTextField', () => {
  let component;

  beforeEach(() => {
    component = shallow(<DateTextField classes={{}} />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });

  it('Should disable the TextField when disabled is true', () => {
    component.setProps({ disabled: true });
    expect(component.find('TextField').props().disabled).toBe(true);
  });

  it('Should disable the IconButton and TextField when disabled and keyboard are true', () => {
    component.setProps({ keyboard: true, disabled: true });

    expect(component.find('TextField').props().disabled).toBe(true);
    expect(component.dive()
      .find('WithStyles(Input)')
      .dive().dive()
      .find('WithStyles(IconButton)')
      .props().disabled).toBe(true);
  });
});

describe('DateTextField with custom TextField', () => {
  it('Should handle a component function', () => {
    function CustomTextField(props) {
      return (
        <li {...props} />
      );
    }

    const component = shallow(
      <DateTextField
        classes={{}}
        utils={utilsToUse}
        TextFieldComponent={CustomTextField}
      />
    );

    // Check InputProps to make sure DateTextField is passing props to the custom component
    expect(component.props('InputProps')).toBeTruthy();
    expect(component.find('li')).toBeTruthy();
  });

  it('Should handle a component string', () => {
    const component = shallow(<DateTextField classes={{}} TextFieldComponent="li" />);

    expect(component.props('InputProps')).toBeTruthy();
    expect(component.find('li')).toBeTruthy();
  });

  it('Should not handle a node', () => {
    const mount = createMount();
    expect(() => {
      mount(<DateTextField classes={{}} utils={utilsToUse} TextFieldComponent={<div />} />);
    }).toThrow();
  });
});
