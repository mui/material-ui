// Note that most of use cases are covered in cypress tests e2e/integration/DateRange.spec.ts
import * as React from 'react';
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
});
