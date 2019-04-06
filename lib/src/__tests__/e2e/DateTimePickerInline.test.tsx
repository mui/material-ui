import { PopoverProps } from '@material-ui/core/Popover';
import { ReactWrapper } from 'enzyme';
import * as React from 'react';
import DateTimePickerInline, {
  DateTimePickerInlineProps,
} from '../../DateTimePicker/DateTimePickerInline';
import { mount, utilsToUse } from '../test-utils';

describe('e2e - DateTimePickerInline', () => {
  let component: ReactWrapper<DateTimePickerInlineProps>;
  const onChangeMock = jest.fn();
  const onCloseMock = jest.fn();
  const onOpenMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    component = mount(
      <DateTimePickerInline
        onChange={onChangeMock}
        onClose={onCloseMock}
        onOpen={onOpenMock}
        value={utilsToUse.date('2018-01-01T00:00:00.000')}
      />
    );
  });

  it('Should renders', () => {
    expect(component).toBeTruthy();
  });

  it('Should open modal with picker on click', () => {
    component.find('input').simulate('click');
    expect(component.find('WithStyles(Popover)').props().open).toBeTruthy();
    expect(onOpenMock).toHaveBeenCalled();
  });

  it('Should close on popover close request', () => {
    const popoverOnClose = (component.find('WithStyles(Popover)').props() as PopoverProps).onClose;
    if (!popoverOnClose) {
      throw new Error('expected popoverOnClose');
    }

    popoverOnClose({} as any);
    expect(component.find('WithStyles(Popover)').props().open).toBeFalsy();
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('Should get the full workflow for datetime picker', () => {
    // Date
    component.find('input').simulate('click');
    component
      .find('Day button')
      .at(10)
      .simulate('click');

    expect(component.find('Clock').prop('type')).toBe('hours');

    // Hour
    component
      .find('Clock div[role="menu"]')
      .simulate('mouseUp', { nativeEvent: { offsetX: 10, offsetY: 20 } });

    expect(component.find('Clock').prop('type')).toBe('minutes');

    // Minutes
    component
      .find('Clock div[role="menu"]')
      .simulate('mouseUp', { nativeEvent: { offsetX: 10, offsetY: 20 } });

    expect(onChangeMock).toHaveBeenCalled();
    expect(onCloseMock).toHaveBeenCalled();
  });
});
