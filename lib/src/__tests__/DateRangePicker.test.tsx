// Note that most of use cases are covered in cypress tests e2e/integration/DateRange.spec.ts
import * as React from 'react';
import { isWeekend } from 'date-fns';
import { mount, utilsToUse } from './test-utils';
import { TextField, TextFieldProps } from '@material-ui/core';
import { DesktopDateRangePicker } from '../DateRangePicker/DateRangePicker';

const defaultRangeRenderInput = (startProps: TextFieldProps, endProps: TextFieldProps) => (
  <>
    <TextField {...startProps} />
    <TextField {...endProps} />
  </>
);

describe('DateRangePicker', () => {
  it('allows select range', () => {
    const component = mount(
      <DesktopDateRangePicker
        open
        renderInput={defaultRangeRenderInput}
        onChange={jest.fn()}
        value={[
          utilsToUse.date(new Date('2018-01-01T00:00:00.000Z')),
          utilsToUse.date(new Date('2018-01-31T00:00:00.000Z')),
        ]}
      />
    );

    expect(component.find('[data-mui-test="DateRangeHighlight"]').length).toBe(31);
  });

  it('allows disabling dates', () => {
    const component = mount(
      <DesktopDateRangePicker
        open
        renderInput={defaultRangeRenderInput}
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
    ).toBe(59);
  });

  it('prop: calendars', () => {
    const component = mount(
      <DesktopDateRangePicker
        open
        renderInput={defaultRangeRenderInput}
        calendars={3}
        onChange={jest.fn()}
        value={[
          utilsToUse.date('2018-01-01T00:00:00.000'),
          utilsToUse.date('2018-01-31T00:00:00.000'),
        ]}
      />
    );

    expect(component.find('Calendar').length).toBe(3);
    expect(component.find('button[data-mui-test="DateRangeDay"]').length).toBe(90);
  });

  it(`doesn't crashes if opening picker with invalid date input`, () => {
    const component = mount(
      <DesktopDateRangePicker
        open
        renderInput={defaultRangeRenderInput}
        calendars={3}
        onChange={jest.fn()}
        value={[utilsToUse.date(new Date(NaN)), utilsToUse.date('2018-01-31T00:00:00.000')]}
      />
    );

    component
      .find('input')
      .at(1)
      .simulate('focus');

    expect(component.find('div[role="tooltip"]').length).toBe(1);
  });
});
