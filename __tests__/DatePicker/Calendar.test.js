import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import { Calendar } from '../../src/DatePicker/Calendar';

describe('Calendar', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Calendar classes={{}} date={moment('01-01-2017')} />);
  });

  it('Should renders', () => {
    console.log(component.debug()); // TODO REMOVE ME
    expect(component).toBeTruthy();
  });
});
