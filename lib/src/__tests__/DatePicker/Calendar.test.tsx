import { ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { Calendar, CalendarProps } from '../../DatePicker/components/Calendar';
import { shallowRender, utilsToUse } from '../test-utils';

describe('Calendar', () => {
  let component: ShallowWrapper<CalendarProps>;

  beforeEach(() => {
    component = shallowRender(props => (
      <Calendar date={utilsToUse.date('01-01-2017')} onChange={jest.fn()} {...props} />
    ));
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
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
    component.find('EventListener').simulate('keyDown', { keyCode: 38, preventDefault: jest.fn() });
    expect(onChangeMock).toHaveBeenCalled();
  });

  it('Should render go to next week on down', () => {
    component.find('EventListener').simulate('keyDown', { keyCode: 40, preventDefault: jest.fn() });
    expect(onChangeMock).toHaveBeenCalled();
  });

  it('Should render go to prev week on up', () => {
    component.find('EventListener').simulate('keyDown', { keyCode: 37, preventDefault: jest.fn() });
    expect(onChangeMock).toHaveBeenCalled();
  });

  it('Should render go to prev week on up', () => {
    component.find('EventListener').simulate('keyDown', { keyCode: 39, preventDefault: jest.fn() });
    expect(onChangeMock).toHaveBeenCalled();
  });
});
