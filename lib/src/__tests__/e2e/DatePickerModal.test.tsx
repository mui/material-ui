import { IconButton, InputAdornment } from '@material-ui/core';
import { ReactWrapper } from 'enzyme';
import * as React from 'react';
import DatePickerModal, { DatePickerModalProps } from '../../DatePicker/DatePickerModal';
import { mount, utilsToUse } from '../test-utils';

describe('e2e -- DatePickerModal keyboard input', () => {
  const onChangeMock = jest.fn();
  let component: ReactWrapper<DatePickerModalProps>;

  beforeEach(() => {
    component = mount(
      <DatePickerModal
        keyboard
        label="Masked input"
        placeholder="10/10/2018"
        format={process.env.UTILS === 'moment' ? 'DD/MM/YYYY' : 'dd/MM/yyyy'}
        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
        value={'2018-01-01T00:00:00.000'}
        onChange={onChangeMock}
        InputAdornmentProps={{
          disableTypography: true,
        }}
        InputLabelProps={{
          htmlFor: 'your-id',
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>date_range</IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  });

  it('Should properly set value on change keyboard', () => {
    const e = { target: { value: '10/11/2018' } };

    component.find('input').simulate('change', e);
    expect(component.find('t').prop('value')).toBe('10/11/2018');

    component.find('input').simulate('blur');
    expect(onChangeMock).toBeCalled();
  });
});

describe('e2e - DatePickerModal default year format', () => {
  let component: ReactWrapper<DatePickerModalProps>;
  const onChangeMock = jest.fn();
  const date = utilsToUse.date('2018-01-01T00:00:00.000');

  beforeEach(() => {
    component = mount(<DatePickerModal onChange={onChangeMock} value={date} views={['year']} />);
  });

  it('Should use year format by default for year only view', () => {
    expect(component.find('input').props().value).toBe(
      utilsToUse.format(date, utilsToUse.yearFormat)
    );
  });
});

describe('e2e - DatePickerModal default year month format', () => {
  let component: ReactWrapper<DatePickerModalProps>;
  const onChangeMock = jest.fn();
  const date = utilsToUse.date('2018-01-01T00:00:00.000');

  beforeEach(() => {
    component = mount(
      <DatePickerModal onChange={onChangeMock} value={date} views={['year', 'month']} />
    );
  });

  it('Should use year month format by default for year & month views', () => {
    expect(component.find('input').props().value).toBe(
      utilsToUse.format(date, utilsToUse.yearMonthFormat)
    );
  });
});

describe('e2e - DatePickerModal default year month day format', () => {
  let component: ReactWrapper<DatePickerModalProps>;
  const onChangeMock = jest.fn();
  const date = utilsToUse.date('2018-01-01T00:00:00.000');

  beforeEach(() => {
    component = mount(
      <DatePickerModal onChange={onChangeMock} value={date} views={['year', 'month', 'day']} />
    );
  });

  it('Should use default for year & month & day views', () => {
    expect(component.find('input').props().value).toBe(
      utilsToUse.format(date, utilsToUse.dateFormat)
    );
  });
});
