import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { expect } from 'chai';
import { useFakeTimers, SinonFakeTimers } from 'sinon';
import { fireEvent, screen } from 'test/utils';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import DesktopDateTimePicker from '@material-ui/lab/DesktopDateTimePicker';
import AdapterDayjs from '../AdapterDayjs';
import { adapterToUse, createPickerRender } from '../internal/pickers/test-utils';

describe('<DesktopDateTimePicker />', () => {
  let clock: SinonFakeTimers;

  beforeEach(() => {
    clock = useFakeTimers(adapterToUse.date('2018-01-01T00:00:00.000').getTime());
  });

  afterEach(() => {
    clock.restore();
  });

  const render = createPickerRender({ strict: false });

  it('opens dialog on calendar button click for Mobile mode', () => {
    render(
      <DesktopDateTimePicker
        value={null}
        onChange={() => {}}
        renderInput={(params) => <TextField autoFocus {...params} />}
      />,
    );

    fireEvent.click(screen.getByLabelText(/choose date/i));
    expect(screen.getByRole('dialog')).toBeVisible();
  });

  it('prop: dateAdapter – allows to override date adapter with prop', () => {
    render(
      <DesktopDateTimePicker
        open
        renderInput={(params) => <TextField {...params} />}
        onChange={() => {}}
        dateAdapter={new AdapterDayjs({ locale: 'ru' })}
        disableMaskedInput
        value={dayjs('2018-01-15T00:00:00.000')}
      />,
    );

    expect(screen.getByText('январь')).toBeVisible();
  });

  it('prop: mask – should take the mask prop into account', () => {
    render(
      <DesktopDateTimePicker
        renderInput={(params) => <TextField autoFocus {...params} />}
        ampm={false}
        inputFormat="mm.dd.yyyy hh:mm"
        mask="__.__.____ __:__"
        onChange={() => {}}
        value={null}
      />,
    );

    const textbox = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(textbox, {
      target: {
        value: '12',
      },
    });

    expect(textbox.value).to.equal('12.');
  });

  it('prop: maxDateTime – minutes is disabled by date part', () => {
    render(
      <DesktopDateTimePicker
        open
        openTo="minutes"
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
        value={adapterToUse.date('2018-01-01T12:00:00.000')}
        minDateTime={adapterToUse.date('2018-01-01T12:30:00.000')}
      />,
    );

    expect(screen.getByLabelText('25 minutes')).to.have.class('Mui-disabled');
    expect(screen.getByLabelText('35 minutes')).to.not.have.class('Mui-disabled');
  });

  it('prop: minDateTime – hours is disabled by date part', () => {
    render(
      <DesktopDateTimePicker
        open
        openTo="hours"
        onChange={() => {}}
        ampm={false}
        renderInput={(params) => <TextField {...params} />}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        minDateTime={adapterToUse.date('2018-01-01T12:30:00.000')}
      />,
    );

    expect(screen.getByLabelText('11 hours')).to.have.class('Mui-disabled');
  });

  it('shows ArrowSwitcher on ClockView disabled and not allows to return back to the date', () => {
    render(
      <DesktopDateTimePicker
        open
        openTo="hours"
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
      />,
    );

    expect(screen.getByLabelText('open previous view')).to.have.attribute('disabled');
  });

  it('allows to switch using ArrowSwitcher on ClockView', () => {
    render(
      <DesktopDateTimePicker
        open
        openTo="hours"
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
      />,
    );

    fireEvent.click(screen.getByLabelText('open next view'));
    expect(screen.getByLabelText('open next view')).to.have.attribute('disabled');
  });
});
