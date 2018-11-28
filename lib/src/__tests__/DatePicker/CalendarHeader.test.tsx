import { ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { CalendarHeader, CalendarHeaderProps } from '../../DatePicker/components/CalendarHeader';
import { shallow, utilsToUse } from '../test-utils';

describe('CalendarHeader', () => {
  let component: ShallowWrapper<CalendarHeaderProps>;

  beforeEach(() => {
    component = shallow(
      <CalendarHeader
        classes={{} as any}
        theme={{} as any}
        currentMonth={utilsToUse.date('01-01-2017')}
        onMonthChange={jest.fn()}
        slideDirection="right"
        utils={utilsToUse}
      />
    );
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
