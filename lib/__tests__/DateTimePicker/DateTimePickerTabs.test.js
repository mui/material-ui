import React from 'react';
import { shallow } from '../test-utils';
import { DateTimePickerTabs } from '../../src/DateTimePicker/components/DateTimePickerTabs';

describe('DateTimePickerTabs', () => {
  let component;

  beforeEach(() => {
    component = shallow(<DateTimePickerTabs
      theme={{ palette: { type: 'light' } }}
      classes={{}}
    />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
