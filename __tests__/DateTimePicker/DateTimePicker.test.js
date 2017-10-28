import React from 'react';
import { shallow } from 'enzyme';
import DateTimePicker from '../../src/DateTimePicker/DateTimePicker';

describe('DateTimePicker', () => {
  let component;

  beforeEach(() => {
    component = shallow(<DateTimePicker />);
  });

  it('Should renders', () => {
    console.log(component.debug()); // TODO REMOVE ME
    expect(component).toBeTruthy();
  });
});
