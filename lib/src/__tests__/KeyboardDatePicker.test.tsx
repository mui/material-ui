import * as React from 'react';
import addDays from 'date-fns/addDays';
import { mount } from './test-utils';
import { ReactWrapper } from 'enzyme';
import { TextField } from '@material-ui/core';
import { DesktopDatePicker, DatePickerProps } from '../DatePicker/DatePicker';

describe('e2e -- DatePicker keyboard input', () => {
  const onChangeMock = jest.fn();
  let component: ReactWrapper<DatePickerProps>;

  beforeEach(() => {
    component = mount(
      <DesktopDatePicker
        renderInput={props => (
          <TextField
            placeholder="10/10/2018"
            InputLabelProps={{
              htmlFor: 'your-id',
            }}
            {...props}
          />
        )}
        label="Masked input"
        inputFormat={process.env.UTILS === 'moment' ? 'DD/MM/YYYY' : 'dd/MM/yyyy'}
        value={new Date('2018-01-01T00:00:00.000Z')}
        onChange={onChangeMock}
        InputAdornmentProps={{
          disableTypography: true,
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

// We are going to remove validation at all, so shut it up for now
describe.skip('e2e -- KeyboardDatePicker validation errors', () => {
  it('Should render error message if date is unparseable', () => {
    const component = mount(
      <DesktopDatePicker
        renderInput={props => <TextField {...props} />}
        inputFormat={process.env.UTILS === 'moment' ? 'DD/MM/YYYY' : 'dd/MM/yyyy'}
        value={new Date(NaN)}
        onChange={jest.fn()}
      />
    );

    expect(component.find('ForwardRef(TextField)').prop('helperText')).toBe('Invalid Date Format');
  });

  it('Should render error message if date is after disableFuture', () => {
    const component = mount(
      <DesktopDatePicker
        renderInput={props => <TextField {...props} />}
        onChange={jest.fn()}
        disableFuture
        value={addDays(new Date(), 2)}
        inputFormat={process.env.UTILS === 'moment' ? 'DD/MM/YYYY' : 'dd/MM/yyyy'}
      />
    );

    expect(component.find('ForwardRef(TextField)').prop('helperText')).toBe(
      'Date should not be after maximal date'
    );
  });

  it('Should render error message if date is before disablePast', () => {
    const component = mount(
      <DesktopDatePicker
        renderInput={props => <TextField {...props} />}
        onChange={jest.fn()}
        disablePast
        value={addDays(new Date(), -2)}
        inputFormat={process.env.UTILS === 'moment' ? 'DD/MM/YYYY' : 'dd/MM/yyyy'}
      />
    );

    expect(component.find('ForwardRef(TextField)').prop('helperText')).toBe(
      'Date should not be before minimal date'
    );
  });

  it('Should not render error message if date is after maxDate without strict comparison', () => {
    const component = mount(
      <DesktopDatePicker
        renderInput={props => <TextField {...props} />}
        onChange={jest.fn()}
        maxDate={new Date('2018-01-01T00:00:00.000Z')}
        value={new Date('2018-01-01T01:00:00.000Z')}
        inputFormat={process.env.UTILS === 'moment' ? 'DD/MM/YYYY' : 'dd/MM/yyyy'}
      />
    );

    expect(component.find('ForwardRef(TextField)').prop('helperText')).toBe(undefined);
  });

  it('Should render error message if date is after maxDate with strict comparison', () => {
    const component = mount(
      <DesktopDatePicker
        renderInput={props => <TextField {...props} />}
        onChange={jest.fn()}
        maxDate={new Date('2018-01-01T00:00:00.000Z')}
        value={new Date('2018-01-01T01:00:00.000Z')}
        strictCompareDates
        inputFormat={process.env.UTILS === 'moment' ? 'DD/MM/YYYY' : 'dd/MM/yyyy'}
      />
    );

    expect(component.find('ForwardRef(TextField)').prop('helperText')).toBe(
      'Date should not be after maximal date'
    );
  });

  it('Should not render error message if date is after minDate without strict comparison', () => {
    const component = mount(
      <DesktopDatePicker
        renderInput={props => <TextField {...props} />}
        onChange={jest.fn()}
        minDate={new Date('2018-01-01T01:00:00.000Z')}
        value={new Date('2018-01-01T00:00:00.000Z')}
        inputFormat={process.env.UTILS === 'moment' ? 'DD/MM/YYYY' : 'dd/MM/yyyy'}
      />
    );

    expect(component.find('ForwardRef(TextField)').prop('helperText')).toBe(undefined);
  });

  it('Should render error message if date is after minDate with strict comparison', () => {
    const component = mount(
      <DesktopDatePicker
        renderInput={props => <TextField {...props} />}
        onChange={jest.fn()}
        minDate={new Date('2018-01-01T01:00:00.000Z')}
        value={new Date('2018-01-01T00:00:00.000Z')}
        strictCompareDates
        inputFormat={process.env.UTILS === 'moment' ? 'DD/MM/YYYY' : 'dd/MM/yyyy'}
      />
    );

    expect(component.find('ForwardRef(TextField)').prop('helperText')).toBe(
      'Date should not be before minimal date'
    );
  });
});
