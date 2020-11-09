import * as React from 'react';
import deLocale from 'date-fns/locale/de';
import enLocale from 'date-fns/locale/en-US';
import 'dayjs/locale/de';
import TextField from '@material-ui/core/TextField';
import { screen, waitFor } from '@testing-library/react';
import { UtilClassToUse, getByMuiTest, utilsToUse, FakeTransitionComponent } from './test-utils';
import { createClientRender, fireEvent } from './createClientRender';
import {
  DatePicker,
  DatePickerProps,
  DesktopDatePicker,
  LocalizationProvider,
  MobileDatePicker,
} from '../index';

describe('<DatePicker />', () => {
  const render = createClientRender({ strict: false });

  it('Allows to select edge years from list', () => {
    render(
      <DatePicker
        open
        reduceAnimations
        value={null}
        onChange={jest.fn()}
        openTo="year"
        minDate={new Date('2000-01-01')}
        maxDate={new Date('2010-01-01')}
        renderInput={(props) => <TextField {...props} />}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: '2010' }));
    expect(getByMuiTest('datepicker-toolbar-date')).toHaveTextContent('Fri, Jan 1');
  });

  it("doesn't close picker on selection in Mobile mode", () => {
    render(
      <MobileDatePicker
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
        onChange={jest.fn()}
        renderInput={(props) => <TextField {...props} />}
      />
    );

    fireEvent.click(screen.getByRole('textbox'));
    fireEvent.click(screen.getByLabelText('Jan 2, 2018'));

    expect(screen.queryByRole('dialog')).toBeInTheDocument();
  });

  it('Closes picker on selection in Desktop mode', async () => {
    render(
      <DesktopDatePicker
        TransitionComponent={FakeTransitionComponent}
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
        onChange={jest.fn()}
        renderInput={(props) => <TextField {...props} />}
      />
    );

    fireEvent.click(screen.getByLabelText('Choose date, selected date is Jan 1, 2018'));

    await waitFor(() => screen.getByRole('dialog'));
    fireEvent.click(screen.getByLabelText('Jan 2, 2018'));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it("Prop `disableCloseOnSelect` – if `true` doesn't close picker", async () => {
    render(
      <DesktopDatePicker
        TransitionComponent={FakeTransitionComponent}
        disableCloseOnSelect
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
        onChange={jest.fn()}
        renderInput={(props) => <TextField {...props} />}
      />
    );

    fireEvent.click(screen.getByLabelText('Choose date, selected date is Jan 1, 2018'));

    await waitFor(() => screen.getByRole('dialog'));
    fireEvent.click(screen.getByLabelText('Jan 2, 2018'));

    expect(screen.queryByRole('dialog')).toBeInTheDocument();
  });

  it('does not call onChange if same date selected', async () => {
    const onChangeMock = jest.fn();

    render(
      <DesktopDatePicker
        TransitionComponent={FakeTransitionComponent}
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
        onChange={onChangeMock}
        renderInput={(props) => <TextField {...props} />}
      />
    );

    fireEvent.click(screen.getByLabelText('Choose date, selected date is Jan 1, 2018'));
    await waitFor(() => screen.getByRole('dialog'));

    fireEvent.click(screen.getByLabelText('Jan 1, 2018'));
    expect(onChangeMock).not.toHaveBeenCalled();
  });

  describe('input validation', () => {
    interface FormProps {
      locale: any;
      Picker: React.ElementType<DatePickerProps>;
      PickerProps: Partial<DatePickerProps>;
    }
    const Form = (props: FormProps) => {
      const { locale, Picker, PickerProps } = props;
      const [value, setValue] = React.useState<unknown>(new Date('01/01/2020'));

      return (
        <LocalizationProvider dateAdapter={UtilClassToUse} locale={locale}>
          <Picker
            onChange={setValue}
            renderInput={(props2) => <TextField {...props2} />}
            value={value}
            {...PickerProps}
          />
        </LocalizationProvider>
      );
    };

    const tests = [
      {
        locale: 'en',
        valid: 'January 2020',
        invalid: 'Januar 2020',
        dateFns: enLocale,
      },
      {
        locale: 'de',
        valid: 'Januar 2020',
        invalid: 'Janua 2020',
        dateFns: deLocale,
      },
    ];

    tests.forEach((test) => {
      const { valid, invalid } = test;
      const locale = process.env.UTILS === 'date-fns' ? test.dateFns : test.locale;

      it(`${test.locale}: should set invalid`, () => {
        render(
          <Form
            locale={locale}
            Picker={DesktopDatePicker}
            PickerProps={{ views: ['month', 'year'] }}
          />
        );
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: invalid } });
        expect(input).toBeInvalid();
      });

      // Need to run with ICU loaded https://moment.github.io/luxon/docs/manual/install.html#node
      if (process.env.UTILS === 'luxon') {
        return;
      }

      it(`${test.locale}: should set to valid when was invalid`, () => {
        render(
          <Form
            locale={locale}
            Picker={DesktopDatePicker}
            PickerProps={{ views: ['month', 'year'] }}
          />
        );
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: invalid } });
        fireEvent.change(input, { target: { value: valid } });
        expect(input).toBeValid();
      });
    });
  });
});
