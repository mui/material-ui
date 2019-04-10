import * as React from 'react';
import KeyboardDateTimePicker, {
  KeyboardDateTimePickerProps,
} from '../../DateTimePicker/KeyboardDateTimePicker';
import { ReactWrapper } from 'enzyme';
import { mount, utilsToUse } from '../test-utils';

const format = process.env.UTILS === 'moment' ? 'MM/DD/YYYY HH:mm' : 'MM/dd/yyyy hh:mm';

describe('e2e - KeyboardDateTimePicker (inline)', () => {
  let component: ReactWrapper<KeyboardDateTimePickerProps>;
  const onChangeMock = jest.fn();
  const onCloseMock = jest.fn();
  const onOpenMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    component = mount(
      <KeyboardDateTimePicker
        autoOk
        variant="inline"
        inputVariant="outlined"
        onChange={onChangeMock}
        onClose={onCloseMock}
        onOpen={onOpenMock}
        format={format}
        KeyboardButtonProps={{ id: 'keyboard-button' }}
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
