import addDays from 'date-fns/addDays';
import { ReactWrapper } from 'enzyme';
import * as React from 'react';
import KeyboardDatePicker, { KeyboardDatePickerProps } from '../../DatePicker/KeyboardDatePicker';
import { mount } from '../test-utils';

describe('e2e -- DatePicker keyboard input', () => {
  const onChangeMock = jest.fn();
  let component: ReactWrapper<KeyboardDatePickerProps>;

  beforeEach(() => {
    component = mount(
      <KeyboardDatePicker
        label="Masked input"
        placeholder="10/10/2018"
        format={process.env.UTILS === 'moment' ? 'DD/MM/YYYY' : 'dd/MM/yyyy'}
        value={new Date('2018-01-01T00:00:00.000Z')}
        onChange={onChangeMock}
        InputAdornmentProps={{
          disableTypography: true,
        }}
        InputLabelProps={{
          htmlFor: 'your-id',
        }}
      />
    );
  });

  it('Should properly set value on change keyboard', () => {
    const e = { target: { value: '10/11/2018' } };

    component.find('input').simulate('change', e);
    expect(component.find('input').prop('value')).toBe('10/11/2018');

    component.find('input').simulate('blur');
    expect(onChangeMock).toBeCalled();
  });
});

describe('e2e -- KeyboardDatePicker validation errors', () => {
  it('Should render error message if date is unparseable', () => {
    const component = mount(
      <KeyboardDatePicker
        format={process.env.UTILS === 'moment' ? 'DD/MM/YYYY' : 'dd/MM/yyyy'}
        value={new Date(NaN)}
        onChange={jest.fn()}
      />
    );

    expect(component.find('TextField').prop('helperText')).toBe('Invalid Date Format');
  });

  it('Should render error message if date is after maxDate', () => {
    const component = mount(
      <KeyboardDatePicker
        onChange={jest.fn()}
        disableFuture
        value={addDays(new Date(), 2)}
        format={process.env.UTILS === 'moment' ? 'DD/MM/YYYY' : 'dd/MM/yyyy'}
      />
    );

    expect(component.find('TextField').prop('helperText')).toBe(
      'Date should not be after maximal date'
    );
  });

  it('Should render error message if date is after maxDate', () => {
    const component = mount(
      <KeyboardDatePicker
        onChange={jest.fn()}
        disablePast
        value={addDays(new Date(), -2)}
        format={process.env.UTILS === 'moment' ? 'DD/MM/YYYY' : 'dd/MM/yyyy'}
      />
    );

    expect(component.find('TextField').prop('helperText')).toBe(
      'Date should not be before minimal date'
    );
  });
});
