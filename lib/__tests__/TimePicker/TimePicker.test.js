import React from 'react';
import { shallow, utilsToUse } from '../test-utils';
import { TimePicker } from '../../src/TimePicker/TimePicker';

describe('TimePicker', () => {
  let component;

  beforeEach(() => {
    component = shallow(<TimePicker
      classes={{}}
      theme={{}}
      date={utilsToUse.date('01-01-2017 12:00')}
    />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
