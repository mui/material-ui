import * as React from 'react';
import { ReactWrapper } from 'enzyme';
import { clickOKButton } from './commands';
import { TimePicker, TimePickerProps } from '../../TimePicker/TimePicker';
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
      <TimePicker open value={utilsToUse.date('2018-01-01T00:00:00.000')} onChange={onChangeMock} />
    );
  });

  it('Should renders', () => {
    expect(component).toBeTruthy();
  });

  it('Should submit onChange on moving', () => {
    component.find('Clock div[role="menu"]').simulate('mouseMove', fakeTouchEvent);
    component.find('Clock div[role="menu"]').simulate('mouseUp', fakeTouchEvent);

    expect(
      component
        .find('ToolbarButton')
        .at(0)
        .text()
    ).toBe('11');
  });

  it('Should change minutes (touch)', () => {
    component
      .find('ToolbarButton')
      .at(1)
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

    expect(
      component
        .find('ToolbarButton')
        .at(1)
        .text()
    ).toBe('53');
  });

  it('Should change meridiem mode', () => {
    component
      .find('ToolbarButton')
      .at(3)
      .simulate('click');

    clickOKButton(component);
    toHaveBeenCalledExceptMoment(onChangeMock, [utilsToUse.date('2018-01-01T12:00:00.000')]);
  });
});

describe('e2e - TimePicker with seconds', () => {
  let component: ReactWrapper<TimePickerProps>;
  const onChangeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    component = mount(
      <TimePicker
        open
        views={['hours', 'minutes', 'seconds']}
        value={utilsToUse.date('2018-01-01T00:00:12.000')}
        onChange={onChangeMock}
      />
    );
  });

  it('Should show seconds number', () => {
    expect(
      component
        .find('ToolbarButton')
        .at(2)
        .text()
    ).toBe('12');
  });

  it('Should change seconds', () => {
    component
      .find('ToolbarButton')
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

    clickOKButton(component);
    toHaveBeenCalledExceptMoment(onChangeMock, [utilsToUse.date('2018-01-01T00:00:53.000')]);
  });
});
