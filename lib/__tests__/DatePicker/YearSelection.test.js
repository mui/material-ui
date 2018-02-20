import React from 'react';
import moment from 'moment';
import { shallow } from '../test-utils';
import { YearSelection } from '../../src/DatePicker/YearSelection';

describe('YearSelection', () => {
  let component;

  beforeEach(() => {
    component = shallow(<YearSelection classes={{}} date={moment('01-01-2017')} />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
