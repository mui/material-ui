import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { isWeekend } from 'date-fns';
import { act } from 'react-dom/test-utils';
import { DesktopDatePicker } from '../DatePicker/DatePicker';
import { mountPickerWithState, utilsToUse } from './test-utils';
import { DesktopDateRangePicker } from '../DateRangePicker/DateRangePicker';
import { TimePickerProps, DesktopTimePicker } from '../TimePicker/TimePicker';

jest.useFakeTimers();

const disableWeekends = (date: unknown) => {
  return isWeekend(utilsToUse.toJsDate(date));
};

describe('DatePicker validation', () => {
  test.each`
    props                                     | input            | expectedError
    ${{}}                                     | ${'invalidText'} | ${'invalidDate'}
    ${{ disablePast: true }}                  | ${'01/01/1900'}  | ${'disablePast'}
    ${{ disableFuture: true }}                | ${'01/01/2050'}  | ${'disableFuture'}
    ${{ minDate: new Date('01/01/2000') }}    | ${'01/01/1990'}  | ${'minDate'}
    ${{ maxDate: new Date('01/01/2000') }}    | ${'01/01/2010'}  | ${'maxDate'}
    ${{ shouldDisableDate: disableWeekends }} | ${'04/25/2020'}  | ${'shouldDisableDate'}
  `('Should dispatch onError $expectedError', ({ props, input, expectedError }) => {
    if (process.env.UTILS === 'luxon') {
      return;
    }

    const onErrorMock = jest.fn();
    const component = mountPickerWithState(utilsToUse.date(), (stateProps) => (
      <DesktopDatePicker {...stateProps} {...props} onError={onErrorMock} />
    ));

    component.find('input').simulate('change', {
      target: {
        value: input,
      },
    });

    expect(onErrorMock).toBeCalledWith(expectedError, expect.anything());
  });

  it('It should properly annulate the error', () => {
    if (process.env.UTILS === 'luxon') {
      return;
    }

    const onErrorMock = jest.fn();
    const component = mountPickerWithState(utilsToUse.date(), (stateProps) => (
      <DesktopDatePicker {...stateProps} disablePast onError={onErrorMock} />
    ));

    component.find('input').simulate('change', {
      target: {
        value: '01/01/1900',
      },
    });

    expect(onErrorMock).toHaveBeenCalledWith('disablePast', expect.anything());

    component.find('input').simulate('change', {
      target: {
        value: '01/01/2099',
      },
    });

    expect(onErrorMock).toHaveBeenCalledWith(null, expect.anything());
  });
});

describe('TimePicker validation', () => {
  const createTime = (time: string) => new Date('01/01/2000 ' + time);
  const shouldDisableTime: TimePickerProps['shouldDisableTime'] = (value, _clockType) => {
    return value === 10;
  };

  test.each`
    props                               | input            | expectedError
    ${{}}                               | ${'invalidText'} | ${'invalidDate'}
    ${{ minTime: createTime('08:00') }} | ${'03:00'}       | ${'minTime'}
    ${{ maxTime: createTime('08:00') }} | ${'12:00'}       | ${'maxTime'}
    ${{ shouldDisableTime }}            | ${'10:00'}       | ${'shouldDisableTime-hours'}
    ${{ shouldDisableTime }}            | ${'00:10'}       | ${'shouldDisableTime-minutes'}
  `('TimePicker should dispatch onError $expectedError', ({ props, input, expectedError }) => {
    const onErrorMock = jest.fn();
    const component = mountPickerWithState(utilsToUse.date(), (stateProps) => (
      <DesktopTimePicker ampm={false} {...stateProps} {...props} onError={onErrorMock} />
    ));

    component.find('input').simulate('change', {
      target: {
        value: input,
      },
    });

    expect(onErrorMock).toBeCalledWith(expectedError, expect.anything());
  });
});

describe('DateRangePicker validation', () => {
  test.each`
    props                                     | startInput      | endInput        | expectedError
    ${{}}                                     | ${'99/99/9999'} | ${'99/99/9999'} | ${['invalidDate', 'invalidDate']}
    ${{}}                                     | ${'01/01/2020'} | ${'01/01/1920'} | ${['invalidRange', 'invalidRange']}
    ${{ minDate: new Date('01/01/2000') }}    | ${'01/01/1990'} | ${'01/01/1990'} | ${['minDate', 'minDate']}
    ${{ maxDate: new Date('01/01/2000') }}    | ${'01/01/2010'} | ${'01/01/2010'} | ${['maxDate', 'maxDate']}
    ${{ disablePast: true }}                  | ${'01/01/1800'} | ${'01/01/2120'} | ${['disablePast', 'maxDate']}
    ${{ disablePast: true }}                  | ${'01/01/1800'} | ${'01/01/2090'} | ${['disablePast', null]}
    ${{ disableFuture: true }}                | ${'01/01/2010'} | ${'01/01/2050'} | ${[null, 'disableFuture']}
    ${{ shouldDisableDate: disableWeekends }} | ${'04/25/2020'} | ${'06/25/2020'} | ${['shouldDisableDate', null]}
  `('Should dispatch onError $expectedError', ({ props, startInput, endInput, expectedError }) => {
    if (process.env.UTILS === 'luxon') {
      return;
    }

    const onErrorMock = jest.fn();

    const component = mountPickerWithState([null, null], (stateProps) => (
      <DesktopDateRangePicker
        {...stateProps}
        {...props}
        onError={onErrorMock}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />
    ));

    component
      .find('input')
      .at(0)
      .simulate('change', {
        target: {
          value: startInput,
        },
      });

    act(() => {
      jest.runAllTimers();
    });

    component
      .find('input')
      .at(1)
      .simulate('change', {
        target: {
          value: endInput,
        },
      });

    act(() => {
      jest.runAllTimers();
    });

    expect(onErrorMock).toBeCalledWith(expectedError, expect.anything());
  });
});
