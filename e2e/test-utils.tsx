import * as React from 'react';
import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { mount } from 'cypress-react-unit-test';
import { DIALOG_WIDTH } from '../lib/src/constants/dimensions';
import { LocalizationProvider, StaticDatePickerProps } from '@material-ui/pickers';

// Time of the first commit to the pickers ❤️
const momentInTime = new Date('2017-10-07T19:36:00.000Z');
const mockRequiredProps = {
  reduceAnimations: true, // speedup tests
  value: momentInTime,
  onChange: () => {},
  renderInput: (props: TextFieldProps) => <TextField {...props} />,
};

/* Globally mock time for all component tests */
function mockTime() {
  cy.clock(momentInTime.getTime());
}

export function mountStaticPicker(
  createStaticPickerNode: (
    props: Pick<StaticDatePickerProps, 'value' | 'onChange' | 'renderInput'>
  ) => React.ReactNode
) {
  document.body.style.margin = '0px';
  cy.viewport(DIALOG_WIDTH, 500);

  mockTime();

  mount(
    <LocalizationProvider dateAdapter={DateFnsAdapter}>
      {createStaticPickerNode(mockRequiredProps)}
    </LocalizationProvider>
  );
}

export function mountPicker(
  createPicker: (
    props: Pick<StaticDatePickerProps, 'value' | 'onChange' | 'renderInput'>
  ) => React.ReactNode
) {
  mockTime();

  mount(
    <LocalizationProvider dateAdapter={DateFnsAdapter}>
      {createPicker(mockRequiredProps)}
    </LocalizationProvider>
  );
}

export function mountPickerWithState(
  createPicker: (
    props: Pick<StaticDatePickerProps, 'value' | 'onChange' | 'renderInput'>
  ) => JSX.Element
) {
  function PickerWithState() {
    const [value, setDate] = React.useState<any>(momentInTime);

    return createPicker({ ...mockRequiredProps, value, onChange: date => setDate(date) });
  }

  mountPicker(() => <PickerWithState />);
}
