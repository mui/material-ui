import * as React from 'react';
import TimePicker, { TimePickerProps } from '../../TimePicker/TimePickerRoot';
import { ReactWrapper } from 'enzyme';
import { mount, utilsToUse, toHaveBeenCalledExceptMoment } from '../test-utils';

const fakeTouchEvent = {
  buttons: 1,
  nativeEvent: {
    offsetX: 20,
    offsetY: 15,
  },
};

describe('e2e - TimePicker', () => {
  let component: ReactWrapper<TimePickerProps>;
  const onChangeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    component = mount(
      <TimePicker date={utilsToUse.date('2018-01-01T00:00:00.000')} onChange={onChangeMock} />
    );
  });

  it('Should renders', () => {
    expect(component).toBeTruthy();
  });

  it('Should submit onChange on moving', () => {
    component.find('Clock div[role="menu"]').simulate('mouseMove', fakeTouchEvent);

    expect(onChangeMock).toHaveBeenCalled();
  });

  it('Should submit hourview (mouse move)', () => {
    component
      .find('WithStyles(ToolbarButton)')
      .at(1)
      .simulate('click');
    component.find('Clock div[role="menu"]').simulate('mouseUp', fakeTouchEvent);

    expect(onChangeMock).toHaveBeenCalled();
  });

  it('Should change minutes (touch)', () => {
    component
      .find('WithStyles(ToolbarButton)')
      .at(2)
      .simulate('click');

    component.find('Clock div[role="menu"]').simulate('touchMove', {
      buttons: 1,
      changedTouches: [
        {
          clientX: 20,
          clientY: 15,
        },
      ],
    });

    expect(onChangeMock).toHaveBeenCalled();

    component.find('Clock div[role="menu"]').simulate('touchEnd', {
      buttons: 1,
      changedTouches: [
        {
          clientX: 20,
          clientY: 15,
        },
      ],
    });

    expect(onChangeMock).toHaveBeenCalled();
  });

  it('Should change meridiem mode', () => {
    component
      .find('WithStyles(ToolbarButton)')
      .at(3)
      .simulate('click');

    toHaveBeenCalledExceptMoment(onChangeMock, [utilsToUse.date('2018-01-01T12:00:00.000'), false]);
  });
});

describe('e2e - TimePicker with seconds', () => {
  let component: ReactWrapper<TimePickerProps>;
  const onChangeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    component = mount(
      <TimePicker
        seconds
        date={utilsToUse.date('2018-01-01T00:00:12.000')}
        onChange={onChangeMock}
      />
    );
  });

  it('Should show seconds number', () => {
    expect(
      component
        .find('WithStyles(ToolbarButton)')
        .at(2)
        .text()
    ).toBe('12');
  });

  it('Should change seconds', () => {
    component
      .find('WithStyles(ToolbarButton)')
      .at(2)
      .simulate('click');

    component.find('Clock div[role="menu"]').simulate('touchMove', {
      buttons: 1,
      changedTouches: [
        {
          clientX: 20,
          clientY: 15,
        },
      ],
    });

    toHaveBeenCalledExceptMoment(onChangeMock, [utilsToUse.date('2018-01-01T00:00:53.000'), false]);
  });
});
