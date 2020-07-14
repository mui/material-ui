import * as React from 'react';
import { isWeekend } from 'date-fns';
import { screen, waitFor } from '@testing-library/react';
import { utilsToUse, getAllByMuiTest } from './test-utils';
import { TextField, TextFieldProps } from '@material-ui/core';
import { DesktopDateRangePicker, StaticDateRangePicker } from '../';
import { createClientRender, fireEvent } from './createClientRender';

const defaultRangeRenderInput = (startProps: TextFieldProps, endProps: TextFieldProps) => (
  <React.Fragment>
    <TextField {...startProps} />
    <TextField {...endProps} />
  </React.Fragment>
);

describe('<DateRangePicker />', () => {
  const render = createClientRender({ strict: false });

  it('allows disabling dates', () => {
    render(
      <StaticDateRangePicker
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
      getAllByMuiTest('DateRangeDay').filter(day => day.getAttribute('disabled') !== undefined)
    ).toHaveLength(31);
  });

  it(`doesn't crashes if opening picker with invalid date input`, async () => {
    render(
      <DesktopDateRangePicker
        open
        renderInput={defaultRangeRenderInput}
        calendars={3}
        onChange={jest.fn()}
        value={[utilsToUse.date(new Date(NaN)), utilsToUse.date('2018-01-31T00:00:00.000')]}
      />
    );

    fireEvent.focus(screen.getAllByRole('textbox')[0]);

    await waitFor(() => screen.getByRole('tooltip'));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('prop – `renderDay` should be called and render days', async () => {
    render(
      <DesktopDateRangePicker
        open
        renderInput={defaultRangeRenderInput}
        onChange={jest.fn()}
        renderDay={day => <div key={String(day)} data-mui-test="renderDayCalled" />}
        value={[null, null]}
      />
    );

    await waitFor(() => screen.getByRole('tooltip'));
    expect(getAllByMuiTest('renderDayCalled').length).not.toBe(0);
  });
});
