import * as React from 'react';
import { ReactWrapper } from 'enzyme';
import { clickOKButton } from './commands';
import { TextField } from '@material-ui/core';
import { MaterialUiPickersDate } from '../typings/date';
import {
  mount,
  utilsToUse,
  toHaveBeenCalledExceptMoment,
  mountPickerWithState,
} from './test-utils';
import {
  MobileTimePicker,
  DesktopTimePicker,
  TimePicker,
  TimePickerProps,
} from '../TimePicker/TimePicker';

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
      <MobileTimePicker
        renderInput={props => <TextField variant="outlined" {...props} />}
        ampm
        open
        value={utilsToUse.date('2018-01-01T00:00:00.000')}
        onChange={onChangeMock}
      />
    );
  });

  it('Should renders', () => {
    expect(component).toBeTruthy();
  });

  it('Should submit onChange on moving', () => {
    component.find('div[role="menu"]').simulate('mouseMove', fakeTouchEvent);
    component.find('div[role="menu"]').simulate('mouseUp', fakeTouchEvent);

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

    component.find('div[role="menu"]').simulate('touchMove', {
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
        renderInput={props => <TextField {...props} />}
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

    component.find('div[role="menu"]').simulate('touchMove', {
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

describe('e2e - Timepicker view navigation', () => {
  let component: ReactWrapper<TimePickerProps>;

  beforeEach(() => {
    component = mount(
      <DesktopTimePicker
        renderInput={props => <TextField variant="outlined" {...props} />}
        views={['hours', 'minutes', 'seconds']}
        onChange={jest.fn()}
        value={utilsToUse.date('2018-01-01T00:00:12.000')}
      />
    );
  });

  it('Should switch between views', () => {
    component.find('button[data-mui-test="open-picker-from-keyboard"]').simulate('click');

    expect(component.find('ClockView').prop('type')).toBe('hours');
    expect(component.find('button[data-mui-test="previous-arrow-button"]').prop('disabled')).toBe(
      true
    );

    component.find('button[data-mui-test="next-arrow-button"]').simulate('click');
    expect(component.find('ClockView').prop('type')).toBe('minutes');
    expect(component.find('button[data-mui-test="previous-arrow-button"]').prop('disabled')).toBe(
      false
    );

    component.find('button[data-mui-test="next-arrow-button"]').simulate('click');
    expect(component.find('ClockView').prop('type')).toBe('seconds');
    expect(component.find('button[data-mui-test="next-arrow-button"]').prop('disabled')).toBe(true);
  });
});

describe('e2e - TimePicker time validation', () => {
  let component: ReactWrapper<TimePickerProps>;
  const onChangeMock = jest.fn();

  const clockTouchEvents = {
    '13:--': {
      buttons: 1,
      offsetX: 166,
      offsetY: 76,
    },
    '20:--': {
      buttons: 1,
      offsetX: 66,
      offsetY: 157,
    },
    '--:10': {
      buttons: 1,
      offsetX: 220,
      offsetY: 72,
    },
    '--:20': {
      buttons: 1,
      offsetX: 222,
      offsetY: 180,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    component = mount(
      <TimePicker
        renderInput={props => <TextField {...props} />}
        open
        ampm={false}
        onChange={onChangeMock}
        views={['hours', 'minutes', 'seconds']}
        value={utilsToUse.date('2018-01-01T00:00:00.000')}
        minTime={new Date(0, 0, 0, 12, 15, 15)}
        maxTime={new Date(0, 0, 0, 15, 45, 30)}
      />
    );
  });

  it('Should select enabled hour', () => {
    component.find('Clock div[role="menu"]').simulate('touchMove', clockTouchEvents['13:--']);
    expect(component.find('button[data-mui-test="hours"] h3').text()).toBe('13');
  });

  it('Should select enabled minute', () => {
    component.find('Clock div[role="menu"]').simulate('touchMove', clockTouchEvents['13:--']);
    component.find('button[data-mui-test="minutes"]').simulate('click');
    component.find('Clock div[role="menu"]').simulate('touchMove', clockTouchEvents['--:20']);

    expect(component.find('button[data-mui-test="minutes"] h3').text()).toBe('20');
  });

  it('Should not select minute when hour is disabled ', () => {
    component.find('Clock div[role="menu"]').simulate('touchMove', clockTouchEvents['20:--']);
    component.find('button[data-mui-test="minutes"]').simulate('click');
    component.find('Clock div[role="menu"]').simulate('touchMove', clockTouchEvents['--:20']);
  });

  it('Should not select disabled hour', () => {
    component.find('Clock div[role="menu"]').simulate('touchMove', clockTouchEvents['20:--']);
    expect(component.find('button[data-mui-test="hours"] h3').text()).toBe('00');
  });

  it('Should not select disabled second', () => {
    component.find('button[data-mui-test="seconds"]').simulate('click');
    component.find('Clock div[role="menu"]').simulate('touchMove', clockTouchEvents['--:20']);

    expect(component.find('button[data-mui-test="seconds"] h3').text()).toBe('00');
  });

  it('Should select enabled second', () => {
    component.find('Clock div[role="menu"]').simulate('touchMove', clockTouchEvents['13:--']);
    component.find('button[data-mui-test="minutes"]').simulate('click');
    component.find('Clock div[role="menu"]').simulate('touchMove', clockTouchEvents['--:20']);
    component.find('button[data-mui-test="seconds"]').simulate('click');
    component.find('Clock div[role="menu"]').simulate('touchMove', clockTouchEvents['--:10']);

    expect(component.find('button[data-mui-test="seconds"] h3').text()).toBe('10');
  });
});

it('e2e - TimePicker empty date', () => {
  const component = mountPickerWithState(null as MaterialUiPickersDate, props => (
    <TimePicker open {...props} />
  ));

  expect(component.find('button[data-mui-test="hours"]').text()).toBe('--');
  expect(component.find('button[data-mui-test="minutes"]').text()).toBe('--');

  component.find('div[role="menu"]').simulate('touchMove', {
    buttons: 1,
    changedTouches: [
      {
        clientX: 20,
        clientY: 15,
      },
    ],
  });

  expect(component.find('button[data-mui-test="hours"]').text()).not.toBe('--');
  expect(component.find('button[data-mui-test="minutes"]').text()).not.toBe('--');
});
