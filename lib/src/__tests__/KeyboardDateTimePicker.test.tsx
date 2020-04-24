import * as React from 'react';
import { ReactWrapper } from 'enzyme';
import { TextField } from '@material-ui/core';
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
        autoOk
        onChange={onChangeMock}
        onClose={onCloseMock}
        onOpen={onOpenMock}
        inputFormat={format}
        KeyboardButtonProps={{ id: 'keyboard-button' }}
        renderInput={props => <TextField {...props} />}
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
      />
    );
  });

  it('Should renders', () => {
    expect(component).toBeTruthy();
  });

  it('Should open modal with picker on click', () => {
    component.find('button#keyboard-button').simulate('click');
    expect(component.find('WithStyles(ForwardRef(Popover))').props().open).toBeTruthy();
    expect(onOpenMock).toHaveBeenCalled();
  });

  it('Should apply keyboard input', () => {
    component.find('input').simulate('change', { target: { value: '02/01/2018 10:00' } });
    expect(onChangeMock).toHaveBeenCalled();
  });
});
