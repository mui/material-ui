import React from 'react';
import { shallow, utilsToUse } from '../test-utils';
import { CalendarHeader } from '../../src/DatePicker/CalendarHeader';

describe('CalendarHeader', () => {
  let component;

  beforeEach(() => {
    component = shallow(<CalendarHeader
      classes={{}}
      theme={{}}
      currentMonth={utilsToUse.date('01-01-2017')}
    />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
