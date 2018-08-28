import React from 'react';
import { shallow, utilsToUse } from '../test-utils';
import { YearSelection } from '../../src/DatePicker/components/YearSelection';

describe('YearSelection', () => {
  let component;

  beforeEach(() => {
    component = shallow(<YearSelection classes={{}} date={utilsToUse.date('01-01-2017')} />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
