import React from 'react';
import { shallow } from 'enzyme';
import DatePicker from '../../src/DatePicker/DatePicker';

describe('DatePicker', () => {
  let component;

  beforeEach(() => {
    component = shallow(<DatePicker />);
  });

  it('Should renders', () => {
    console.log(component.debug()); // TODO REMOVE ME
    expect(component).toBeTruthy();
  });
});
