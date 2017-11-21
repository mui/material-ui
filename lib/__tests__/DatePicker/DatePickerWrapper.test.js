import React from 'react';
import { shallow } from 'enzyme';
import DatePickerWrapper from '../../src/DatePicker/DatePickerWrapper';

describe('DatePickerWrapper', () => {
  let component;

  beforeEach(() => {
    component = shallow(<DatePickerWrapper />);
  });

  it('Should renders', () => {
    console.log(component.debug()); // TODO REMOVE ME
    expect(component).toBeTruthy();
  });
});
