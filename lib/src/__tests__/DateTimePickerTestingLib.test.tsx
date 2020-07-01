import * as React from 'react';
import { utilsToUse } from './test-utils';
import TextField from '@material-ui/core/TextField';
import { DesktopDateTimePicker } from '../DateTimePicker';
import { createClientRender } from './createClientRender';
import { fireEvent, screen, waitFor } from '@testing-library/react';

describe('<DateTimePicker />', () => {
  const render = createClientRender({ strict: false });

  it('prop: mask – should take the mask prop into account', () => {
    render(
      <DesktopDateTimePicker
        renderInput={props => <TextField autoFocus {...props} />}
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

    expect(textbox.value).toBe('12');
  });

  it('prop: maxDateTime – minutes is disabled by date part', async () => {
    render(
      <DesktopDateTimePicker
        open
        openTo="minutes"
        mask="__.__.____ __:__"
        onChange={() => {}}
        renderInput={props => <TextField {...props} />}
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
        renderInput={props => <TextField {...props} />}
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
        minDateTime={utilsToUse.date('2018-01-01T12:30:00.000Z')}
      />
    );

    await waitFor(() => screen.getByRole('dialog'));
    expect(screen.getByLabelText('11 hours').getAttribute('aria-disabled')).toBe('true');
  });
});
