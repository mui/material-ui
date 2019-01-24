import { IconButton, InputAdornment } from '@material-ui/core';
import { ReactWrapper } from 'enzyme';
import * as React from 'react';
import DatePickerModal from '../../DatePicker';
import DatePicker, { DatePickerProps } from '../../DatePicker/DatePicker';
import { mount, utilsToUse } from '../test-utils';

describe('e2e - DatePicker', () => {
  let component: ReactWrapper<DatePickerProps>;
  const onChangeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    component = mount(
      <DatePicker
        animateYearScrolling={false}
        date={utilsToUse.date('2018-01-01T00:00:00.000Z')}
        onChange={onChangeMock}
      />
    );
  });

  it('Should renders', () => {
    expect(component).toBeTruthy();
  });

  it('Should render proper count of days', () => {
    expect(component.find('Day').length).toBe(35);
  });

  it('Should dispatch onChange on day click', () => {
    component
      .find('Day button')
      .at(2)
      .simulate('click');
    expect(onChangeMock).toHaveBeenCalled();
  });

  it('Should render year selection', () => {
    component
      .find('ToolbarButton')
      .first()
      .simulate('click');
    expect(component.find('Year').length).toBe(201);

    component
      .find('Year')
      .at(1)
      .simulate('click');
    expect(onChangeMock).toHaveBeenCalled();
  });
});

describe('e2e -- DatePicker keyboard input', () => {
  const onChangeMock = jest.fn();
  let component: ReactWrapper<DatePickerProps>;

  beforeEach(() => {
    component = mount(
      <DatePickerModal
        keyboard
        label="Masked input"
        placeholder="10/10/2018"
        format={process.env.UTILS === 'moment' ? 'DD/MM/YYYY' : 'dd/MM/yyyy'}
        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
        value={'2018-01-01T00:00:00.000Z'}
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
