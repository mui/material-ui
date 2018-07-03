import React from 'react';
import { shallow, utilsToUse } from '../test-utils';
import { DatePicker } from '../../src/DatePicker/DatePicker';

describe('DatePicker', () => {
  let component;

  beforeEach(() => {
    component = shallow(<DatePicker classes={{}} date={utilsToUse.date('01-01-2017')} />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
