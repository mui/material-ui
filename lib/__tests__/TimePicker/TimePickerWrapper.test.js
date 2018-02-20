import React from 'react';
import { shallow } from '../test-utils';
import { TimePickerWrapper } from '../../src/TimePicker/TimePickerWrapper';

describe('TimePickerWrapper', () => {
  let component;

  beforeEach(() => {
    component = shallow(<TimePickerWrapper />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
