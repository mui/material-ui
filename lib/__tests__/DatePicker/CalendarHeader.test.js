import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import { CalendarHeader } from '../../src/DatePicker/CalendarHeader';

describe('CalendarHeader', () => {
  let component;

  beforeEach(() => {
    component = shallow(<CalendarHeader classes={{}} theme={{}} currentMonth={moment('01-01-2017')} />);
  });

  it('Should renders', () => {
    console.log(component.debug()); // TODO REMOVE ME
    expect(component).toBeTruthy();
  });
});
