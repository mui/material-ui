import * as React from 'react';
import { ShallowWrapper } from 'enzyme';
import { shallowRender, utilsToUse } from '../test-utils';
import { Calendar, CalendarProps } from '../../views/Calendar/Calendar';

describe('Calendar', () => {
  let component: ShallowWrapper<CalendarProps>;
  const onChangeMock = jest.fn();
  const onMonthChangeMock = jest.fn();

  beforeEach(() => {
    component = shallowRender(props => (
      <Calendar
        date={utilsToUse.date('01-01-2017')}
        onMonthChange={onMonthChangeMock}
        onChange={onChangeMock}
        {...props}
      />
    ));
  });

  it('Should swipe between month', () => {
    component.find('CalendarHeader').prop<any>('onMonthChange')(utilsToUse.date());
    expect(onMonthChangeMock).toHaveBeenCalled();
  });
});

describe('Calendar - disabled selected date on mount', () => {
  let component: ShallowWrapper<any, any, any>;

  beforeEach(() => {
    component = shallowRender(props => (
      <Calendar
        date={utilsToUse.date('01-01-2017')}
        minDate={new Date('01-01-2018')}
        onChange={jest.fn()}
        utils={utilsToUse}
        {...props}
      />
    ));
  });

  it('Should dispatch onDateSelect with isFinish = false on mount', () => {
    const { onChange } = component.instance().props;
    if (process.env.UTILS === 'moment') {
      return expect(onChange).toHaveBeenCalled();
    }

    expect(onChange).toHaveBeenCalledWith(utilsToUse.date('01-01-2018'), false);
  });
});
