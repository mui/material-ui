import { PopoverProps } from '@material-ui/core/Popover';
import { ReactWrapper } from 'enzyme';
import * as React from 'react';
import {
  DatePickerInline,
  DatePickerInlineProps,
} from '../../DatePicker/DatePickerInline';
import { mount, utilsToUse } from '../test-utils';

describe('e2e - InlineDatePicker', () => {
  let component: ReactWrapper<DatePickerInlineProps>;
  const onChangeMock = jest.fn();
  const onCloseMock = jest.fn();
  const onOpenMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    component = mount(
      // date={utilsToUse.date('2018-01-01T00:00:00.000Z')} no such prop
      <DatePickerInline
        animateYearScrolling={false}
        onChange={onChangeMock}
        onClose={onCloseMock}
        onOpen={onOpenMock}
        value={null}
        handleAccept={jest.fn()}
        isAccepted={true}
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
    const popoverOnClose = (component
      .find('WithStyles(Popover)')
      .props() as PopoverProps).onClose;
    if (!popoverOnClose) {
      throw new Error('expected popoverOnClose');
    }
    popoverOnClose({} as any);
    expect(component.find('WithStyles(Popover)').props().open).toBeFalsy();
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('Should dispatch onChange and close on day select', () => {
    component.find('input').simulate('click');
    component
      .find('Day button')
      .at(10)
      .simulate('click');

    expect(onChangeMock).toHaveBeenCalled();
    expect(component.find('WithStyles(Popover)').props().open).toBeFalsy();
  });
});

describe('e2e - InlineDatePicker onlyCalendar', () => {
  it('Should not render toolbar', () => {
    const component = mount(
      // date={utilsToUse.date('2018-01-01T00:00:00.000Z')} no such prop
      <DatePickerInline
        onlyCalendar
        onChange={jest.fn()}
        value={null}
        onClose={jest.fn()}
        onOpen={jest.fn()}
        handleAccept={jest.fn()}
        isAccepted={true}
      />
    );

    component.find('input').simulate('click');
    expect(component.find('PickerToolbar').length).toBe(0);
  });
});
