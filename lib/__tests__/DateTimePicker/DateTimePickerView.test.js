import React from 'react';
import { shallow } from '../test-utils';
import { DateTimePickerView } from '../../src/DateTimePicker/components/DateTimePickerView';

describe('DateTimePickerView', () => {
  let component;

  beforeEach(() => {
    component = shallow(<DateTimePickerView classes={{}} />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
