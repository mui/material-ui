import React from 'react';
import { shallow } from 'enzyme';
import { DateTimePickerView } from '../../src/DateTimePicker/DateTimePickerView';

describe('DateTimePickerView', () => {
  let component;

  beforeEach(() => {
    component = shallow(<DateTimePickerView classes={{}} />);
  });

  it('Should renders', () => {
    console.log(component.debug()); // TODO REMOVE ME
    expect(component).toBeTruthy();
  });
});
