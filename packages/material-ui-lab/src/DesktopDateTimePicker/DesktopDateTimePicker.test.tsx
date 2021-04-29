import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { expect } from 'chai';
import { useFakeTimers, SinonFakeTimers, spy } from 'sinon';
import { act, fireEvent, screen, userEvent } from 'test/utils';
import 'dayjs/locale/ru';
import DesktopDateTimePicker from '@material-ui/lab/DesktopDateTimePicker';
import { adapterToUse, createPickerRender } from '../internal/pickers/test-utils';

describe('<DesktopDateTimePicker />', () => {
  let clock: SinonFakeTimers;

  beforeEach(() => {
    clock = useFakeTimers(adapterToUse.date('2018-01-01T00:00:00.000').getTime());
  });

  afterEach(() => {
    clock.restore();
  });

  const render = createPickerRender();

  it('opens when "Choose date" is clicked', () => {
    render(
      <DesktopDateTimePicker
        value={null}
        onChange={() => {}}
        renderInput={(params) => <TextField autoFocus {...params} />}
      />,
    );

    userEvent.mousePress(screen.getByLabelText(/choose date/i));
    expect(screen.getByRole('dialog')).toBeVisible();
  });

  ['readOnly', 'disabled'].forEach((prop) => {
    it(`cannot be opened when "Choose time" is clicked when ${prop}={true}`, () => {
      const handleOpen = spy();
      render(
        <DesktopDateTimePicker
          value={adapterToUse.date('2019-01-01T00:00:00.000')}
          {...{ [prop]: true }}
          onChange={() => {}}
          onOpen={handleOpen}
          open={false}
          renderInput={(params) => <TextField {...params} />}
        />,
      );

      act(() => {
        userEvent.mousePress(screen.getByLabelText(/Choose date/));
      });

      expect(handleOpen.callCount).to.equal(0);
    });
  });

  it('closes on clickaway', () => {
    const handleClose = spy();
    render(
      <DesktopDateTimePicker
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
        value={null}
        open
        onClose={handleClose}
      />,
    );

    userEvent.mousePress(document.body);

    expect(handleClose.callCount).to.equal(1);
  });

  it('does not close on clickaway when it is not open', () => {
    const handleClose = spy();
    render(
      <DesktopDateTimePicker
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
        value={null}
        onClose={handleClose}
      />,
    );

    userEvent.mousePress(document.body);

    expect(handleClose.callCount).to.equal(0);
  });

  it('does not close on click inside', () => {
    const handleClose = spy();
    render(
      <DesktopDateTimePicker
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
        value={null}
        open
        onClose={handleClose}
      />,
    );

    userEvent.mousePress(screen.getByLabelText('pick time'));

    expect(handleClose.callCount).to.equal(0);
  });

  it('closes on Escape press', () => {
    const handleClose = spy();
    render(
      <DesktopDateTimePicker
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
        value={null}
        open
        onClose={handleClose}
      />,
    );
    act(() => {
      (document.activeElement as HTMLElement).blur();
    });

    fireEvent.keyDown(document.body, { key: 'Escape' });

    expect(handleClose.callCount).to.equal(1);
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
    expect(screen.getByLabelText('35 minutes')).not.to.have.class('Mui-disabled');
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

  describe('prop: PopperProps', () => {
    it('forwards onClick and onTouchStart', () => {
      const handleClick = spy();
      const handleTouchStart = spy();
      render(
        <DesktopDateTimePicker
          open
          onChange={() => {}}
          PopperProps={{
            onClick: handleClick,
            onTouchStart: handleTouchStart,
            // @ts-expect-error `data-*` attributes are not recognized in props objects
            'data-testid': 'popper',
          }}
          renderInput={(params) => <TextField {...params} />}
          value={null}
        />,
      );
      const popper = screen.getByTestId('popper');

      fireEvent.click(popper);
      fireEvent.touchStart(popper);

      expect(handleClick.callCount).to.equal(1);
      expect(handleTouchStart.callCount).to.equal(1);
    });
  });
});
