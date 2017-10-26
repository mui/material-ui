import React from 'react';
import { shallow } from 'enzyme';
import CalendarHeader from '../../src/DatePicker/CalendarHeader';

describe('CalendarHeader', () => {
  let component;

  beforeEach(() => {
    component = shallow(<CalendarHeader />);
  });

  it('Should renders', () => {
    console.log(component.debug()); // TODO REMOVE ME
    expect(component).toBeTruthy();
  });
});
