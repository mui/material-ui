import { PopoverProps } from '@material-ui/core/Popover';
import { ReactWrapper } from 'enzyme';
import * as React from 'react';
import DatePickerInline, { DatePickerInlineProps } from '../../DatePicker/DatePickerInline';
import { mount, utilsToUse } from '../test-utils';

describe('e2e - DatePickerInline', () => {
  let component: ReactWrapper<DatePickerInlineProps>;
  const onChangeMock = jest.fn();
  const onCloseMock = jest.fn();
  const onOpenMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    component = mount(
      <DatePickerInline
        animateYearScrolling={false}
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
      <DatePickerInline
        onlyCalendar
        value={utilsToUse.date('2018-01-01T00:00:00.000')}
        onChange={jest.fn()}
        onClose={jest.fn()}
        onOpen={jest.fn()}
      />
    );

    component.find('input').simulate('click');
    expect(component.find('PickerToolbar').length).toBe(0);
  });
});
