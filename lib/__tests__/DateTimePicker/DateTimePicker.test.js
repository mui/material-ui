import React from 'react';
import { shallow, utilsToUse } from '../test-utils';
import { DateTimePicker } from '../../src/DateTimePicker/DateTimePicker';

describe('DateTimePicker', () => {
  let component;

  beforeEach(() => {
    component = shallow(<DateTimePicker
      date={utilsToUse.date('01-01-2017')}
      classes={{}}
    />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
