import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import { DatePicker } from '../../src/DatePicker/DatePicker';

describe('DatePicker', () => {
  let component;

  beforeEach(() => {
    component = shallow(<DatePicker classes={{}} date={moment('01-01-2017')} />);
  });

  it('Should renders', () => {
    console.log(component.debug()); // TODO REMOVE ME
    expect(component).toBeTruthy();
  });
});
