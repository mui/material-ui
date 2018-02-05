import React from 'react';
import { createShallow, createMount } from 'material-ui/test-utils';
import DateTextField from '../../src/_shared/DateTextField';

describe('DateTextField', () => {
  let component;

  beforeEach(() => {
    const shallow = createShallow({ dive: true });
    component = shallow(<DateTextField />);
  });

  it('Should renders', () => {
    console.log(component.debug()); // TODO REMOVE ME
    expect(component).toBeTruthy();
  });
});

describe('DateTextField with custom TextField', () => {
  let shallow;
  beforeEach(() => {
    shallow = createShallow({ dive: true });
  });

  it('Should handle a component function', () => {
    function CustomTextField(props) {
      return (
        <li {...props} />
      );
    }

    const component = shallow(<DateTextField TextFieldComponent={CustomTextField} />);

    // Check InputProps to make sure DateTextField is passing props to the custom component
    expect(component.prop('InputProps')).toBeTruthy();
    expect(component.find('li')).toBeTruthy();
  });

  it('Should handle a component string', () => {
    const component = shallow(<DateTextField TextFieldComponent="li" />);

    expect(component.prop('InputProps')).toBeTruthy();
    expect(component.find('li')).toBeTruthy();
  });

  it('Should not handle a node', () => {
    const mount = createMount();
    expect(() => {
        mount(<DateTextField TextFieldComponent={<div />} />);
    }).toThrow();
  });
});
