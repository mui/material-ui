import * as React from 'react';
import { expect } from 'chai';
import { isWeekend } from 'date-fns';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import StaticDateRangePicker from '@material-ui/lab/StaticDateRangePicker';
import { createPickerRender, adapterToUse, getAllByMuiTest } from '../internal/pickers/test-utils';

const defaultRangeRenderInput = (startProps: TextFieldProps, endProps: TextFieldProps) => (
  <React.Fragment>
    <TextField {...startProps} />
    <TextField {...endProps} />
  </React.Fragment>
);

describe('<StaticDateRangePicker />', () => {
  const render = createPickerRender({ strict: false });

  it('allows disabling dates', () => {
    render(
      <StaticDateRangePicker
        renderInput={defaultRangeRenderInput}
        minDate={adapterToUse.date('2005-01-01T00:00:00.000')}
        shouldDisableDate={isWeekend}
        onChange={() => {}}
        value={[
          adapterToUse.date('2018-01-01T00:00:00.000'),
          adapterToUse.date('2018-01-31T00:00:00.000'),
        ]}
      />,
    );

    expect(
      getAllByMuiTest('DateRangeDay').filter((day) => day.getAttribute('disabled') !== undefined),
    ).to.have.length(31);
  });
});
