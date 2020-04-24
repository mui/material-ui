// Note that most of use cases are covered in cypress tests e2e/integration/DateRange.spec.ts
import * as React from 'react';
import { isWeekend } from 'date-fns';
import { TextField } from '@material-ui/core';
import { mount, utilsToUse } from './test-utils';
import { DesktopDateRangePicker } from '../DateRangePicker/DateRangePicker';

describe('DateRangePicker', () => {
  test('allows select range', () => {
    const component = mount(
      <DesktopDateRangePicker
        renderInput={props => <TextField {...props} />}
        open
        onChange={jest.fn()}
        value={[
          utilsToUse.date(new Date('2018-01-01T00:00:00.000Z')),
          utilsToUse.date(new Date('2018-01-31T00:00:00.000Z')),
        ]}
      />
    );

    expect(component.find('[data-mui-test="DateRangeHighlight"]').length).toBe(31);
  });

  test('allows disabling dates', () => {
    const component = mount(
      <DesktopDateRangePicker
        renderInput={props => <TextField {...props} />}
        open
        minDate={new Date('2005-01-01')}
        shouldDisableDate={date => isWeekend(utilsToUse.toJsDate(date))}
        onChange={jest.fn()}
        value={[
          utilsToUse.date('2018-01-01T00:00:00.000'),
          utilsToUse.date('2018-01-31T00:00:00.000'),
        ]}
      />
    );

    expect(
      component
        .find('button[data-mui-test="DateRangeDay"]')
        .filterWhere(wrapper => !wrapper.prop('disabled')).length
    ).toBe(70);
  });

  test('prop: calendars', () => {
    const component = mount(
      <DesktopDateRangePicker
        renderInput={props => <TextField {...props} />}
        open
        calendars={3}
        onChange={jest.fn()}
        value={[
          utilsToUse.date('2018-01-01T00:00:00.000'),
          utilsToUse.date('2018-01-31T00:00:00.000'),
        ]}
      />
    );

    expect(component.find('Calendar').length).toBe(3);
    expect(component.find('button[data-mui-test="DateRangeDay"]').length).toBe(105);
  });
});
