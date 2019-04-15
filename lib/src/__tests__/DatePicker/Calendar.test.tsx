import * as React from 'react';
import { ShallowWrapper } from 'enzyme';
import { shallowRender, utilsToUse } from '../test-utils';
import { Calendar, CalendarProps } from '../../DatePicker/components/Calendar';

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
    component.find('WithStyles(CalendarHeader)').prop<any>('onMonthChange')(utilsToUse.date());
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

describe('Calendar - keyboard control', () => {
  let component: ShallowWrapper;
  const onChangeMock = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    component = shallowRender(props => (
      <Calendar
        date={utilsToUse.date('01-01-2017')}
        minDate={new Date('01-01-2018')}
        onChange={onChangeMock}
        theme={{ direction: 'ltr' } as any}
        allowKeyboardControl
        {...props}
      />
    ));
  });

  it('Should render go to prev week on up', () => {
    component.find('EventListener').prop<any>('onKeyDown')({
      key: 'ArrowUp',
      preventDefault: jest.fn(),
    });
    expect(onChangeMock).toHaveBeenCalled();
  });

  it('Should render go to next week on down', () => {
    component.find('EventListener').prop<any>('onKeyDown')({
      key: 'ArrowDown',
      preventDefault: jest.fn(),
    });
    expect(onChangeMock).toHaveBeenCalled();
  });

  it('Should render go to prev week on up', () => {
    component.find('EventListener').prop<any>('onKeyDown')({
      key: 'ArrowLeft',
      preventDefault: jest.fn(),
    });
    expect(onChangeMock).toHaveBeenCalled();
  });

  it('Should render go to prev week on up', () => {
    component.find('EventListener').prop<any>('onKeyDown')({
      key: 'ArrowRight',
      preventDefault: jest.fn(),
    });
    expect(onChangeMock).toHaveBeenCalled();
  });
});
