import React from 'react';
import { shallow } from 'enzyme';
import { DateTimePickerHeader } from '../../src/DateTimePicker/DateTimePickerHeader';

describe('DateTimePickerHed', () => {
  let component;

  beforeEach(() => {
    component = shallow(<DateTimePickerHeader />);
  });

  it('Should renders', () => {
    console.log(component.debug()); // TODO REMOVE ME
    expect(component).toBeTruthy();
  });
});
