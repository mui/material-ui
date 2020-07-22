import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { utilsToUse } from './test-utils';
import { createClientRender } from './createClientRender';
import { DesktopDateTimePicker, StaticDateTimePicker } from '../DateTimePicker';
import { fireEvent, screen, waitFor } from '@testing-library/react';

describe('<DateTimePicker />', () => {
  const render = createClientRender({ strict: false });

  it('prop: mask – should take the mask prop into account', () => {
    render(
      <DesktopDateTimePicker
        renderInput={(props) => <TextField autoFocus {...props} />}
        ampm={false}
        inputFormat={utilsToUse.moment ? 'MM.DD.YYYY HH:mm' : 'mm.dd.yyyy hh:mm'}
        mask="__.__.____ __:__"
        onChange={() => {}}
        value={null}
      />
    );

    const textbox = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(textbox, {
      target: {
        value: '12',
      },
    });

    expect(textbox.value).toBe('12.');
  });

  it('prop: maxDateTime – minutes is disabled by date part', async () => {
    render(
      <DesktopDateTimePicker
        open
        openTo="minutes"
        onChange={() => {}}
        renderInput={(props) => <TextField {...props} />}
        value={utilsToUse.date('2018-01-01T12:00:00.000Z')}
        minDateTime={utilsToUse.date('2018-01-01T12:30:00.000Z')}
      />
    );

    await waitFor(() => screen.getByRole('dialog'));

    expect(screen.getByLabelText('25 minutes').getAttribute('aria-disabled')).toBe('true');
    expect(screen.getByLabelText('35 minutes').getAttribute('aria-disabled')).toBe('false');
  });

  it('prop: minDateTime – hours is disabled by date part', async () => {
    render(
      <DesktopDateTimePicker
        open
        openTo="hours"
        onChange={() => {}}
        ampm={false}
        renderInput={(props) => <TextField {...props} />}
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
        minDateTime={utilsToUse.date('2018-01-01T12:30:00.000Z')}
      />
    );

    await waitFor(() => screen.getByRole('dialog'));
    expect(screen.getByLabelText('11 hours').getAttribute('aria-disabled')).toBe('true');
  });

  it('shows ArrowSwitcher on ClockView disabled and not allows to return back to the date', async () => {
    render(
      <DesktopDateTimePicker
        open
        openTo="hours"
        onChange={() => {}}
        renderInput={(props) => <TextField {...props} />}
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
      />
    );

    await waitFor(() => screen.getByRole('dialog'));
    expect(screen.getByLabelText('open previous view')).toBeDisabled();
  });

  it('allows to switch using ArrowSwitcher on ClockView', async () => {
    render(
      <DesktopDateTimePicker
        open
        openTo="hours"
        onChange={() => {}}
        renderInput={(props) => <TextField {...props} />}
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
      />
    );

    await waitFor(() => screen.getByRole('dialog'));

    fireEvent.click(screen.getByLabelText('open next view'));
    expect(screen.getByLabelText('open next view')).toBeDisabled();
  });

  it('allows to select the same day and move to the next view', () => {
    const onChangeMock = jest.fn();
    render(
      <StaticDateTimePicker
        onChange={onChangeMock}
        renderInput={(props) => <TextField {...props} />}
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
      />
    );

    fireEvent.click(screen.getByLabelText('Jan 1, 2018'));
    expect(onChangeMock).toHaveBeenCalled();

    expect(screen.getByLabelText(/Selected time/)).toBeInTheDocument();
  });
});
