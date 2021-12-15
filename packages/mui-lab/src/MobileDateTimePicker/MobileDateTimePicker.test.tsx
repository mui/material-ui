import * as React from 'react';
import TextField from '@mui/material/TextField';
import { expect } from 'chai';
import { spy, SinonSpy } from 'sinon';
import { fireEvent, fireTouchChangedEvent, screen } from 'test/utils';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import { adapterToUse, createPickerRenderer } from '../internal/pickers/test-utils';

describe('<MobileDateTimePicker />', () => {
  const { render } = createPickerRenderer({
    clock: 'fake',
    clockConfig: adapterToUse.date('2018-01-01T00:00:00.000').getTime(),
  });

  it('opens dialog on textField click for Mobile mode', () => {
    render(
      <MobileDateTimePicker
        value={null}
        onChange={() => {}}
        renderInput={(params) => <TextField autoFocus {...params} />}
      />,
    );

    fireEvent.click(screen.getByRole('textbox'));
    expect(screen.getByRole('dialog')).toBeVisible();
  });

  it('allows to select full date end-to-end', function test() {
    if (typeof window.Touch === 'undefined' || typeof window.TouchEvent === 'undefined') {
      this.skip();
    }

    const onChangeMock: SinonSpy<any> = spy();
    const clockTouchEvent = {
      changedTouches: [
        {
          clientX: 20,
          clientY: 15,
        },
      ],
    };

    function DateTimePickerWithState() {
      const [date, setDate] = React.useState<Date | null>(null);

      return (
        <MobileDateTimePicker
          value={date}
          toolbarPlaceholder="Enter Date"
          onChange={(newDate) => {
            setDate(newDate);
            onChangeMock(newDate);
          }}
          renderInput={(params) => <TextField autoFocus {...params} />}
        />
      );
    }

    render(<DateTimePickerWithState />);
    fireEvent.click(screen.getByLabelText(/choose date/i));

    expect(screen.getByMuiTest('datetimepicker-toolbar-day')).to.have.text('Enter Date');
    expect(screen.getByMuiTest('hours')).to.have.text('--');
    expect(screen.getByMuiTest('minutes')).to.have.text('--');

    // 1. Year view
    fireEvent.click(screen.getByLabelText(/switch to year view/));
    fireEvent.click(screen.getByText('2010', { selector: 'button' }));

    expect(screen.getByMuiTest('datetimepicker-toolbar-year')).to.have.text('2010');

    // 2. Date
    fireEvent.click(screen.getByLabelText('Jan 15, 2010'));

    expect(screen.getByMuiTest('datetimepicker-toolbar-day')).to.have.text('Jan 15');

    // 3. Hours
    fireTouchChangedEvent(screen.getByMuiTest('clock'), 'touchmove', clockTouchEvent);
    fireTouchChangedEvent(screen.getByMuiTest('clock'), 'touchend', clockTouchEvent);

    expect(screen.getByMuiTest('hours')).to.have.text('11');

    // 4. Minutes
    fireTouchChangedEvent(screen.getByMuiTest('clock'), 'touchmove', clockTouchEvent);
    fireTouchChangedEvent(screen.getByMuiTest('clock'), 'touchend', clockTouchEvent);

    expect(screen.getByMuiTest('minutes')).to.have.text('53');
    expect(onChangeMock.callCount).to.equal(4);

    fireEvent.click(screen.getByText(/ok/i));

    expect(onChangeMock.callCount).to.equal(5);
    expect(onChangeMock.args[4][0]).toEqualDateTime(adapterToUse.date('2010-01-15T11:53:00.000'));
  });

  it('prop: open – overrides open state', () => {
    render(
      <MobileDateTimePicker
        renderInput={(params) => <TextField {...params} />}
        open
        onChange={() => {}}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
      />,
    );

    expect(screen.getByRole('dialog')).toBeVisible();
  });

  it('prop: onCloseMock – dispatches on close request', () => {
    const onCloseMock = spy();
    render(
      <MobileDateTimePicker
        renderInput={(params) => <TextField {...params} />}
        open
        onClose={onCloseMock}
        onChange={() => {}}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
      />,
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(onCloseMock.callCount).to.equal(1);
  });

  it('should render date and time by default', () => {
    render(
      <MobileDateTimePicker
        renderInput={(params) => <TextField {...params} />}
        onChange={() => {}}
        open
        value={adapterToUse.date('2021-11-20T10:01:22.000')}
      />,
    );

    expect(screen.queryByMuiTest('seconds')).to.equal(null);
    expect(screen.getByMuiTest('hours')).to.have.text('10');
    expect(screen.getByMuiTest('minutes')).to.have.text('01');
    expect(screen.getByMuiTest('datetimepicker-toolbar-year')).to.have.text('2021');
    expect(screen.getByMuiTest('datetimepicker-toolbar-day')).to.have.text('Nov 20');
  });

  it('can render seconds on view', () => {
    render(
      <MobileDateTimePicker
        renderInput={(params) => <TextField {...params} />}
        onChange={() => {}}
        open
        views={['seconds']}
        value={adapterToUse.date('2021-11-20T10:01:22.000')}
      />,
    );
    expect(screen.getByMuiTest('seconds')).to.have.text('22');
  });
});
