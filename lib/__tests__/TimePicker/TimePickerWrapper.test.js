import React from 'react';
import { shallow } from 'enzyme';
import TimePickerWrapper from '../../src/TimePicker/TimePickerWrapper';

describe('TimePickerWrapper', () => {
  let component;

  beforeEach(() => {
    component = shallow(<TimePickerWrapper />);
  });

  it('Should renders', () => {
    console.log(component.debug()); // TODO REMOVE ME
    expect(component).toBeTruthy();
  });
});
