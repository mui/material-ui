import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { ReactWrapper } from 'enzyme';
import { mount, utilsToUse } from './test-utils';
import { DesktopDateTimePicker, DateTimePickerProps } from '../DateTimePicker/DateTimePicker';

const format = process.env.UTILS === 'moment' ? 'MM/DD/YYYY HH:mm' : 'MM/dd/yyyy hh:mm';

describe('e2e - DesktopDateTimePicker', () => {
  let component: ReactWrapper<DateTimePickerProps>;
  const onChangeMock = jest.fn();
  const onCloseMock = jest.fn();
  const onOpenMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    component = mount(
      <DesktopDateTimePicker
        onChange={onChangeMock}
        onClose={onCloseMock}
        onOpen={onOpenMock}
        disableMaskedInput
        inputFormat={format}
        OpenPickerButtonProps={{ id: 'keyboard-button' }}
        renderInput={(props) => <TextField {...props} />}
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
      />
    );
  });

  it('Should renders', () => {
    expect(component).toBeTruthy();
  });

  it('Should open modal with picker on click', () => {
    component.find('button#keyboard-button').simulate('click');
    expect(component.find('div[role="dialog"]').length).toBe(1);
    expect(onOpenMock).toHaveBeenCalled();
  });

  it('Should apply keyboard input', () => {
    component.find('input').simulate('change', { target: { value: '02/01/2018 10:00' } });
    expect(onChangeMock).toHaveBeenCalled();
  });
});
