import React from 'react';
import { shallow } from 'enzyme';
import { DateTimePickerTabs } from '../../src/DateTimePicker/DateTimePickerTabs';

describe('DateTimePickerTabs', () => {
  let component;

  beforeEach(() => {
    component = shallow(<DateTimePickerTabs classes={{}} />);
  });

  it('Should renders', () => {
    console.log(component.debug()); // TODO REMOVE ME
    expect(component).toBeTruthy();
  });
});
