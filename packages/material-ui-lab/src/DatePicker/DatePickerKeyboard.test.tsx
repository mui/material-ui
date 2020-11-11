import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { isWeekend } from 'date-fns';
import TextField from '@material-ui/core/TextField';
import { fireEvent, screen, act } from 'test/utils';
import DesktopDatePicker, { DesktopDatePickerProps } from '@material-ui/lab/DesktopDatePicker';
import StaticDatePicker from '@material-ui/lab/StaticDatePicker';
import { createPickerRender } from '../internal/pickers/test-utils';
import { MakeOptional } from '../internal/pickers/typings/helpers';

function TestKeyboardDatePicker(
  PickerProps: MakeOptional<DesktopDatePickerProps, 'value' | 'onChange' | 'renderInput'>,
) {
  const [value, setValue] = React.useState<unknown>(
    PickerProps.value ?? new Date('2019-01-01T00:00:00.000'),
  );

  return (
    <DesktopDatePicker
      value={value}
      onChange={(newDate) => setValue(newDate)}
      renderInput={(props) => <TextField placeholder="10/10/2018" {...props} />}
      {...PickerProps}
    />
  );
}

describe('<DatePicker /> keyboard interactions', () => {
  const render = createPickerRender({ strict: false });

  context('input', () => {
    it('allows to change selected date from the input according to `format`', () => {
      const onChangeMock = spy();
      render(<TestKeyboardDatePicker onChange={onChangeMock} inputFormat="dd/MM/yyyy" />);

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: '10/11/2018' },
      });

      expect(screen.getByRole('textbox')).to.have.value('10/11/2018');
      expect(onChangeMock.callCount).to.equal(1);
    });

    it("doesn't accept invalid date format", () => {
      render(<TestKeyboardDatePicker />);

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: '01' },
      });
      expect(screen.getByRole('textbox')).to.have.attr('aria-invalid', 'true');
    });

    it('removes invalid state when chars are cleared from invalid input', () => {
      render(<TestKeyboardDatePicker />);

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: '01' },
      });
      expect(screen.getByRole('textbox')).to.have.attr('aria-invalid', 'true');
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: '' },
      });
      expect(screen.getByRole('textbox')).to.have.attr('aria-invalid', 'false');
    });

    it('renders correct format helper text and placeholder', () => {
      render(
        <TestKeyboardDatePicker
          mask="____"
          inputFormat="yyyy"
          renderInput={(params) => <TextField {...params} id="test" />}
        />,
      );

      const helperText = document.getElementById('test-helper-text');
      expect(helperText).to.have.text('yyyy');

      expect(screen.getByRole('textbox')).to.have.attr('placeholder', 'yyyy');
    });

    it('correctly input dates according to the input mask', () => {
      render(<TestKeyboardDatePicker />);
      const input = screen.getByRole('textbox');

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: '011' },
      });
      expect(input).to.have.value('01/1');

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: '01102019' },
      });
      expect(input).to.have.value('01/10/2019');
    });

    it('prop `disableMaskedInput` – disables mask and allows to input anything to the field', () => {
      render(<TestKeyboardDatePicker disableMaskedInput />);

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'any text' },
      });

      const input = screen.getByRole('textbox');
      expect(input).to.have.value('any text');
      expect(input).to.have.attr('aria-invalid', 'true');
    });

    it('prop `disableMaskedInput` – correctly parses date string when mask is disabled', () => {
      const onChangeMock = spy();
      render(<TestKeyboardDatePicker onChange={onChangeMock} disableMaskedInput />);

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: '01/10/2019' },
      });

      const input = screen.getByRole('textbox');
      expect(input).to.have.value('01/10/2019');
      expect(input).to.have.attribute('aria-invalid', 'false');
      expect(onChangeMock.callCount).to.equal(1);
    });
  });

  context('Calendar keyboard navigation', () => {
    beforeEach(() => {
      // Important: Use <StaticDatePicker /> here in order to avoid async waiting for focus because of packages/material-ui-lab/src/internal/pickers/hooks/useCanAutoFocus.tsx logic
      render(
        <StaticDatePicker
          allowKeyboardControl // required to enable focus management in static mode
          displayStaticWrapperAs="desktop"
          value={new Date('2020-08-13T00:00:00.000')}
          onChange={() => {}}
          renderInput={(params) => <TextField placeholder="10/10/2018" {...params} />}
        />,
      );
    });

    // TODO
    // eslint-disable-next-line mocha/no-skipped-tests
    it.skip('autofocus selected day on mount', () => {
      expect(screen.getByLabelText('Aug 13, 2020')).toHaveFocus();
    });

    [
      { keyCode: 35, key: 'End', expectFocusedDay: 'Aug 15, 2020' },
      { keyCode: 36, key: 'Home', expectFocusedDay: 'Aug 9, 2020' },
      { keyCode: 37, key: 'ArrowLeft', expectFocusedDay: 'Aug 12, 2020' },
      { keyCode: 38, key: 'ArrowUp', expectFocusedDay: 'Aug 6, 2020' },
      { keyCode: 39, key: 'ArrowRight', expectFocusedDay: 'Aug 14, 2020' },
      { keyCode: 40, key: 'ArrowDown', expectFocusedDay: 'Aug 20, 2020' },
    ].forEach(({ key, keyCode, expectFocusedDay }) => {
      // TODO
      // eslint-disable-next-line mocha/no-skipped-tests
      it.skip(key, () => {
        fireEvent.keyDown(document.body, { force: true, keyCode, key });

        expect(document.activeElement).toHaveAccessibleName(expectFocusedDay);
      });
    });
  });

  // TODO
  // eslint-disable-next-line mocha/no-skipped-tests
  it.skip("doesn't allow to select disabled date from keyboard", async () => {
    render(
      <StaticDatePicker
        allowKeyboardControl
        displayStaticWrapperAs="desktop"
        value={new Date('2020-08-13T00:00:00.000')}
        minDate={new Date('2020-08-13T00:00:00.000')}
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    expect(document.activeElement).to.have.attr('aria-label', 'Aug 13, 2020');

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 3; i++) {
      fireEvent.keyDown(document.body, { force: true, keyCode: 37, key: 'ArrowLeft' });
    }

    // leaves focus on the same date
    expect(document.activeElement).to.have.attr('aria-label', 'Aug 13, 2020');
  });

  context('YearPicker keyboard navigation', () => {
    [
      { keyCode: 37, key: 'ArrowLeft', expectFocusedYear: '2019' },
      { keyCode: 38, key: 'ArrowUp', expectFocusedYear: '2016' },
      { keyCode: 39, key: 'ArrowRight', expectFocusedYear: '2021' },
      { keyCode: 40, key: 'ArrowDown', expectFocusedYear: '2024' },
    ].forEach(({ key, keyCode, expectFocusedYear }) => {
      // TODO
      // eslint-disable-next-line mocha/no-skipped-tests
      it.skip(key, () => {
        render(
          <StaticDatePicker
            open
            openTo="year"
            reduceAnimations
            allowKeyboardControl
            displayStaticWrapperAs="desktop"
            value={new Date('2020-08-13T00:00:00.000')}
            onChange={() => {}}
            renderInput={(params) => <TextField {...params} />}
          />,
        );

        fireEvent.keyDown(document.body, { force: true, keyCode, key });

        expect(document.activeElement).to.have.text(expectFocusedYear);
      });
    });
  });

  context('input validaiton', () => {
    [
      { expectedError: 'invalidDate', props: {}, input: 'invalidText' },
      { expectedError: 'disablePast', props: { disablePast: true }, input: '01/01/1900' },
      { expectedError: 'disableFuture', props: { disableFuture: true }, input: '01/01/2050' },
      { expectedError: 'minDate', props: { minDate: new Date('01/01/2000') }, input: '01/01/1990' },
      { expectedError: 'maxDate', props: { maxDate: new Date('01/01/2000') }, input: '01/01/2010' },
      {
        expectedError: 'shouldDisableDate',
        props: { shouldDisableDate: isWeekend },
        input: '04/25/2020',
      },
    ].forEach(({ props, input, expectedError }) => {
      it(`dispatches ${expectedError} error`, () => {
        const onErrorMock = spy();
        // we are running validation on value change
        function DatePickerInput() {
          const [date, setDate] = React.useState<Date | null>(null);

          return (
            <DesktopDatePicker<Date>
              value={date}
              onError={onErrorMock}
              onChange={(newDate) => setDate(newDate)}
              renderInput={(inputProps) => <TextField {...inputProps} />}
              {...props}
            />
          );
        }

        render(<DatePickerInput />);

        fireEvent.change(screen.getByRole('textbox'), {
          target: {
            value: input,
          },
        });

        expect(onErrorMock.calledWith(expectedError)).to.be.equal(true);
      });
    });
  });

  // TODO
  // eslint-disable-next-line mocha/no-skipped-tests
  it.skip('Opens calendar by keydown on the open button', () => {
    render(<TestKeyboardDatePicker />);
    const openButton = screen.getByLabelText(/choose date/i);

    act(() => {
      openButton.focus();
    });

    fireEvent.keyDown(openButton, {
      key: 'Enter',
      keyCode: 13,
    });

    expect(screen.queryByRole('dialog')).toBeVisible();
  });
});
