import * as React from 'react';
import { expect } from 'chai';
import deLocale from 'date-fns/locale/de';
import enLocale from 'date-fns/locale/en-US';
import TextField from '@material-ui/core/TextField';
import DesktopDatePicker, { DesktopDatePickerProps } from '@material-ui/lab/DesktopDatePicker';
import { fireEvent, screen } from 'test/utils';
import { adapterToUse, createPickerRender } from '../internal/pickers/test-utils';

describe('<DesktopDatePicker /> localization', () => {
  describe('input validation', () => {
    interface FormProps {
      Picker: React.ElementType<DesktopDatePickerProps>;
      PickerProps: Partial<DesktopDatePickerProps>;
    }

    const Form = (props: FormProps) => {
      const { Picker, PickerProps } = props;
      const [value, setValue] = React.useState<unknown>(adapterToUse.date('01/01/2020'));

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
      const localizedRender = createPickerRender({ locale: dateFnsLocale });

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
