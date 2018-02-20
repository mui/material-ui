import React from 'react';
import { shallow } from '../test-utils';
import { DateTimePickerWrapper } from '../../src/DateTimePicker/DateTimePickerWrapper';

describe('DateTimePickerWrapper', () => {
  let component;

  beforeEach(() => {
    component = shallow(<DateTimePickerWrapper classes={{}} />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
