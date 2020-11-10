import * as React from 'react';
import { expect } from 'chai';
import fr from 'date-fns/locale/fr';
import deLocale from 'date-fns/locale/de';
import enLocale from 'date-fns/locale/en-US';
import TextField from '@material-ui/core/TextField';
import MobileDatePicker from '@material-ui/lab/MobileDatePicker';
import DesktopDatePicker, { DesktopDatePickerProps } from '@material-ui/lab/DesktopDatePicker';
import { fireEvent, screen } from 'test/utils';
import { adapterToUse, getByMuiTest, createPickerRender } from '../internal/pickers/test-utils';

describe('<DatePicker /> localization', () => {
  const render = createPickerRender({ strict: false, locale: fr });

  // TODO
  // eslint-disable-next-line mocha/no-skipped-tests
  it.skip('datePicker localized format for year view', () => {
    render(
      <MobileDatePicker
        renderInput={(params) => <TextField {...params} />}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        onChange={() => {}}
        views={['year']}
      />,
    );

    expect(screen.getByRole('textbox')).to.have.value('2018');

    fireEvent.click(screen.getByLabelText(/Choose date/));
    expect(getByMuiTest('datepicker-toolbar-date').textContent).to.equal('2018');
  });

  // TODO
  // eslint-disable-next-line mocha/no-skipped-tests
  it.skip('datePicker localized format for year+month view', () => {
    render(
      <MobileDatePicker
        renderInput={(params) => <TextField {...params} />}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        onChange={() => {}}
        views={['year', 'month']}
      />,
    );

    expect(screen.getByRole('textbox')).to.have.value('janvier 2018');

    fireEvent.click(screen.getByLabelText(/Choose date/));
    expect(getByMuiTest('datepicker-toolbar-date').textContent).to.equal('janvier');
  });

  // TODO
  // eslint-disable-next-line mocha/no-skipped-tests
  it.skip('datePicker localized format for year+month+date view', () => {
    render(
      <MobileDatePicker
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        views={['year', 'month', 'date']}
      />,
    );

    expect(screen.getByRole('textbox')).to.have.value('01/01/2018');

    fireEvent.click(screen.getByLabelText(/Choose date/));
    expect(getByMuiTest('datepicker-toolbar-date').textContent).to.equal('1 janvier');
  });

  describe('input validation', () => {
    interface FormProps {
      Picker: React.ElementType<DesktopDatePickerProps>;
      PickerProps: Partial<DesktopDatePickerProps>;
    }

    const Form = (props: FormProps) => {
      const { Picker, PickerProps } = props;
      const [value, setValue] = React.useState<unknown>(new Date('01/01/2020'));

      return (
        <Picker
          onChange={setValue}
          renderInput={(inputProps) => <TextField {...inputProps} />}
          value={value}
          {...PickerProps}
        />
      );
    };

    const tests = [
      {
        locale: 'en-US',
        valid: 'January 2020',
        invalid: 'Januar 2020',
        dateFnsLocale: enLocale,
      },
      {
        locale: 'de',
        valid: 'Januar 2020',
        invalid: 'Janua 2020',
        dateFnsLocale: deLocale,
      },
    ];

    tests.forEach(({ valid, invalid, locale, dateFnsLocale }) => {
      const localizedRender = createPickerRender({ strict: false, locale: dateFnsLocale });

      it(`${locale}: should set invalid`, () => {
        localizedRender(
          <Form Picker={DesktopDatePicker} PickerProps={{ views: ['month', 'year'] }} />,
        );

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: invalid } });

        expect(input).to.have.attribute('aria-invalid', 'true');
      });

      it(`${locale}: should set to valid when was invalid`, () => {
        localizedRender(
          <Form Picker={DesktopDatePicker} PickerProps={{ views: ['month', 'year'] }} />,
        );

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: invalid } });
        fireEvent.change(input, { target: { value: valid } });

        expect(input).to.have.attribute('aria-invalid', 'false');
      });
    });
  });
});
