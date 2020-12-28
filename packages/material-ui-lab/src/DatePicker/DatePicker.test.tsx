import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import TextField from '@material-ui/core/TextField';
import { fireEvent, screen, waitFor } from 'test/utils';
import PickersDay from '@material-ui/lab/PickersDay';
import CalendarSkeleton from '@material-ui/lab/PickersCalendarSkeleton';
import DatePicker from '@material-ui/lab/DatePicker';
import MobileDatePicker from '@material-ui/lab/MobileDatePicker';
import DesktopDatePicker from '@material-ui/lab/DesktopDatePicker';
import StaticDatePicker from '@material-ui/lab/StaticDatePicker';
import {
  createPickerRender,
  FakeTransitionComponent,
  adapterToUse,
  getByMuiTest,
  getAllByMuiTest,
  queryAllByMuiTest,
  openDesktopPicker,
  openMobilePicker,
} from '../internal/pickers/test-utils';

describe('<DatePicker />', () => {
  const render = createPickerRender({ strict: false });

  it('render proper month', () => {
    render(
      <StaticDatePicker
        value={adapterToUse.date('2019-01-01T00:00:00.000')}
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    expect(screen.getByText('January')).toBeVisible();
    expect(screen.getByText('2019')).toBeVisible();
    expect(getAllByMuiTest('day')).to.have.length(31);
  });

  it('desktop Mode – Accepts date on day button click', () => {
    const onChangeMock = spy();

    render(
      <DesktopDatePicker
        value={adapterToUse.date('2019-01-01T00:00:00.000')}
        onChange={onChangeMock}
        TransitionComponent={FakeTransitionComponent}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    openDesktopPicker();

    fireEvent.click(screen.getByLabelText('Jan 2, 2019'));
    expect(onChangeMock.callCount).to.equal(1);

    expect(screen.queryByRole('dialog')).to.equal(null);
  });

  it('mobile mode – Accepts date on `OK` button click', () => {
    const onChangeMock = spy();
    render(
      <MobileDatePicker
        value={adapterToUse.date('2019-01-01T00:00:00.000')}
        onChange={onChangeMock}
        DialogProps={{ TransitionComponent: FakeTransitionComponent }}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    openMobilePicker();

    fireEvent.click(screen.getByLabelText('Jan 2, 2019'));
    expect(onChangeMock.callCount).to.equal(1);
    expect(screen.queryByRole('dialog')).not.to.equal(null);

    fireEvent.click(screen.getByText(/ok/i));
    // TODO revisit calling onChange twice. Now it is expected for mobile mode.
    expect(onChangeMock.callCount).to.equal(2);
    expect(screen.queryByRole('dialog')).to.equal(null);
  });

  it('switches between months', () => {
    render(
      <StaticDatePicker
        reduceAnimations
        value={adapterToUse.date('2019-01-01T00:00:00.000')}
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    expect(getByMuiTest('calendar-month-text')).to.have.text('January');

    const nextMonth = screen.getByLabelText('Next month');
    const previousMonth = screen.getByLabelText('Previous month');
    fireEvent.click(nextMonth);
    fireEvent.click(nextMonth);

    fireEvent.click(previousMonth);
    fireEvent.click(previousMonth);
    fireEvent.click(previousMonth);

    expect(getByMuiTest('calendar-month-text')).to.have.text('December');
  });

  it('selects the closest enabled date if selected date is disabled', () => {
    const onChangeMock = spy();

    render(
      <MobileDatePicker
        open
        value={adapterToUse.date('2019-01-01T00:00:00.000')}
        onChange={onChangeMock}
        renderInput={(params) => <TextField {...params} />}
        maxDate={adapterToUse.date('2018-01-01T00:00:00.000')}
      />,
    );

    expect(getByMuiTest('calendar-year-text')).to.have.text('2018');
    expect(getByMuiTest('calendar-month-text')).to.have.text('January');

    // onChange must be dispatched with newly selected date
    expect(onChangeMock.calledWith(adapterToUse.date('2018-01-01T00:00:00.000'))).to.be.equal(true);
  });

  it('allows to change only year', () => {
    const onChangeMock = spy();
    render(
      <MobileDatePicker
        open
        value={adapterToUse.date('2019-01-01T00:00:00.000')}
        onChange={onChangeMock}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    fireEvent.click(screen.getByLabelText(/switch to year view/i));
    fireEvent.click(screen.getByText('2010', { selector: 'button' }));

    expect(getByMuiTest('calendar-year-text')).to.have.text('2010');
    expect(onChangeMock.callCount).to.equal(1);
  });

  it('allows to select edge years from list', () => {
    render(
      <MobileDatePicker
        open
        reduceAnimations
        value={null}
        onChange={() => {}}
        openTo="year"
        minDate={adapterToUse.date('2000-01-01T00:00:00.000')}
        maxDate={adapterToUse.date('2010-01-01T00:00:00.000')}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    fireEvent.click(screen.getByText('2010', { selector: 'button' }));
    expect(getByMuiTest('datepicker-toolbar-date')).to.have.text('Fri, Jan 1');
  });

  it("doesn't close picker on selection in Mobile mode", () => {
    render(
      <MobileDatePicker
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    fireEvent.click(screen.getByRole('textbox'));
    fireEvent.click(screen.getByLabelText('Jan 2, 2018'));

    expect(screen.queryByRole('dialog')).toBeVisible();
  });

  it('closes picker on selection in Desktop mode', async () => {
    render(
      <DesktopDatePicker
        TransitionComponent={FakeTransitionComponent}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    fireEvent.click(screen.getByLabelText('Choose date, selected date is Jan 1, 2018'));

    await waitFor(() => screen.getByRole('dialog'));
    fireEvent.click(screen.getByLabelText('Jan 2, 2018'));

    expect(screen.queryByRole('dialog')).to.equal(null);
  });

  it('prop `clearable` - renders clear button in Mobile mode', () => {
    const onChangeMock = spy();
    render(
      <MobileDatePicker
        clearable
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        onChange={onChangeMock}
        DialogProps={{ TransitionComponent: FakeTransitionComponent }}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    openMobilePicker();
    fireEvent.click(screen.getByText('Clear'));

    expect(onChangeMock.calledWith(null)).to.be.equal(true);
    expect(screen.queryByRole('dialog')).to.equal(null);
  });

  it("prop `disableCloseOnSelect` – if `true` doesn't close picker", () => {
    render(
      <DesktopDatePicker
        TransitionComponent={FakeTransitionComponent}
        disableCloseOnSelect
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    openDesktopPicker();
    fireEvent.click(screen.getByLabelText('Jan 2, 2018'));

    expect(screen.queryByRole('dialog')).toBeVisible();
  });

  it('does not call onChange if same date selected', async () => {
    const onChangeMock = spy();

    render(
      <DesktopDatePicker
        TransitionComponent={FakeTransitionComponent}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        onChange={onChangeMock}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    fireEvent.click(screen.getByLabelText('Choose date, selected date is Jan 1, 2018'));
    await waitFor(() => screen.getByRole('dialog'));

    fireEvent.click(screen.getByLabelText('Jan 1, 2018'));
    expect(onChangeMock.callCount).to.equal(0);
  });

  it('allows to change selected date from the input according to `format`', () => {
    const onChangeMock = spy();
    render(
      <DesktopDatePicker
        renderInput={(props) => <TextField placeholder="10/10/2018" {...props} />}
        label="Masked input"
        inputFormat="dd/MM/yyyy"
        value={adapterToUse.date('2018-01-01T00:00:00.000Z')}
        onChange={onChangeMock}
        InputAdornmentProps={{
          disableTypography: true,
        }}
      />,
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: {
        value: '10/11/2018',
      },
    });

    expect(screen.getByRole('textbox')).to.have.value('10/11/2018');
    expect(onChangeMock.callCount).to.equal(1);
  });

  it('prop `showToolbar` – renders toolbar in desktop mode', () => {
    render(
      <DesktopDatePicker
        open
        showToolbar
        onChange={() => {}}
        TransitionComponent={FakeTransitionComponent}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    expect(getByMuiTest('picker-toolbar')).toBeVisible();
  });

  it('prop `toolbarTitle` – should render title from the prop', () => {
    render(
      <MobileDatePicker
        renderInput={(params) => <TextField {...params} />}
        open
        toolbarTitle="test"
        label="something"
        onChange={() => {}}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
      />,
    );

    expect(getByMuiTest('picker-toolbar-title').textContent).to.equal('test');
  });

  it('prop `toolbarTitle` – should use label if no toolbar title', () => {
    render(
      <MobileDatePicker
        open
        label="Default label"
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
      />,
    );

    expect(getByMuiTest('picker-toolbar-title').textContent).to.equal('Default label');
  });

  it('prop `toolbarFormat` – should format toolbar according to passed format', () => {
    render(
      <MobileDatePicker
        renderInput={(params) => <TextField {...params} />}
        open
        onChange={() => {}}
        toolbarFormat="MMMM"
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
      />,
    );

    expect(getByMuiTest('datepicker-toolbar-date').textContent).to.equal('January');
  });

  it('prop `showTodayButton` – accept current date when "today" button is clicked', () => {
    const onCloseMock = spy();
    const onChangeMock = spy();
    render(
      <MobileDatePicker
        renderInput={(params) => <TextField {...params} />}
        showTodayButton
        cancelText="stream"
        onClose={onCloseMock}
        onChange={onChangeMock}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        DialogProps={{ TransitionComponent: FakeTransitionComponent }}
      />,
    );

    fireEvent.click(screen.getByRole('textbox'));
    fireEvent.click(screen.getByText(/today/i));

    expect(onCloseMock.callCount).to.equal(1);
    expect(onChangeMock.callCount).to.equal(1);
  });

  it('ref - should forwardRef to text field', () => {
    const Component = () => {
      const ref = React.useRef<HTMLInputElement>(null);
      const focusPicker = () => {
        if (ref.current) {
          ref.current.focus();
          expect(ref.current.id).to.equal('test-focusing-picker');
        } else {
          throw new Error('Ref must be available');
        }
      };

      return (
        <React.Fragment>
          <DatePicker
            ref={ref}
            value={null}
            onChange={() => {}}
            renderInput={(params) => <TextField id="test-focusing-picker" {...params} />}
          />
          <button type="button" onClick={focusPicker}>
            test
          </button>
        </React.Fragment>
      );
    };

    render(<Component />);
    fireEvent.click(screen.getByText('test'));
  });

  it('prop `shouldDisableYear` – disables years dynamically', () => {
    render(
      <StaticDatePicker
        renderInput={(params) => <TextField {...params} />}
        openTo="year"
        onChange={() => {}}
        // getByRole() with name attribute is too slow, so restrict the number of rendered years
        minDate={adapterToUse.date('2025-01-01T00:00:00.000')}
        maxDate={adapterToUse.date('2035-01-01T00:00:00.000')}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        shouldDisableYear={(year) => adapterToUse.getYear(year) === 2030}
      />,
    );

    const getYearButton = (year: number) =>
      screen.getByText(year.toString(), { selector: 'button' });

    expect(getYearButton(2029)).not.to.have.attribute('disabled');
    expect(getYearButton(2030)).to.have.attribute('disabled');
    expect(getYearButton(2031)).not.to.have.attribute('disabled');
  });

  it('prop `onMonthChange` – dispatches callback when months switching', () => {
    const onMonthChangeMock = spy();
    render(
      <MobileDatePicker
        open
        renderInput={(params) => <TextField {...params} />}
        onChange={() => {}}
        onMonthChange={onMonthChangeMock}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
      />,
    );

    fireEvent.click(screen.getByLabelText('Next month'));
    expect(onMonthChangeMock.callCount).to.equal(1);
  });

  it('prop `loading` – displays default loading indicator', () => {
    render(
      <MobileDatePicker
        open
        loading
        renderInput={(params) => <TextField {...params} />}
        onChange={() => {}}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
      />,
    );

    expect(queryAllByMuiTest(document.body, 'day')).to.have.length(0);
    expect(getByMuiTest('loading-progress')).toBeVisible();
  });

  it('prop `renderLoading` – displays custom loading indicator', () => {
    render(
      <MobileDatePicker
        loading
        renderLoading={() => <CalendarSkeleton data-testid="custom-loading" />}
        open
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
      />,
    );

    expect(screen.queryByTestId('loading-progress')).to.equal(null);
    expect(screen.getByTestId('custom-loading')).toBeVisible();
  });

  it('prop `ToolbarComponent` – render custom toolbar component', () => {
    render(
      <MobileDatePicker
        renderInput={(params) => <TextField {...params} />}
        open
        value={adapterToUse.date()}
        onChange={() => {}}
        ToolbarComponent={() => <div data-testid="custom-toolbar" />}
      />,
    );

    expect(screen.getByTestId('custom-toolbar')).toBeVisible();
  });

  it('prop `renderDay` – renders custom day', () => {
    render(
      <MobileDatePicker
        renderInput={(params) => <TextField {...params} />}
        open
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        onChange={() => {}}
        renderDay={(day, _selected, DayComponentProps) => (
          <PickersDay {...DayComponentProps} data-testid="test-day" />
        )}
      />,
    );

    expect(screen.getAllByTestId('test-day')).to.have.length(31);
  });

  it('prop `defaultCalendarMonth` – opens on provided month if date is `null`', () => {
    render(
      <MobileDatePicker
        renderInput={(params) => <TextField {...params} />}
        open
        value={null}
        onChange={() => {}}
        defaultCalendarMonth={adapterToUse.date('2018-07-01T00:00:00.000')}
      />,
    );

    expect(screen.getByText('July')).toBeVisible();
  });
});
