import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import { DateTimePicker } from '../../src/DateTimePicker/DateTimePicker';

describe('DateTimePicker', () => {
  let component;

  beforeEach(() => {
    component = shallow(<DateTimePicker
      date={moment('01-01-2017')}
      classes={{}}
    />);
  });

  it('Should renders', () => {
    console.log(component.debug()); // TODO REMOVE ME
    expect(component).toBeTruthy();
  });
});
