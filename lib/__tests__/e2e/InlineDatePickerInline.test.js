import React from 'react';
import { mount, utilsToUse } from '../test-utils';
import DatePickerInline from '../../src/DatePicker/DatePickerInline';

describe('e2e - InlineDatePicker', () => {
  let component;
  const onChangeMock = jest.fn();
  const onCloseMock = jest.fn();
  const onOpenMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    component = mount(<DatePickerInline
      animateYearScrolling={false}
      date={utilsToUse.date('2018-01-01T00:00:00.000Z')}
      onChange={onChangeMock}
      onClose={onCloseMock}
      onOpen={onOpenMock}
    />);
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
    component.find('WithStyles(Popover)').props().onClose();
    expect(component.find('WithStyles(Popover)').props().open).toBeFalsy();
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('Should dispatch onChange and close on day select', () => {
    component.find('input').simulate('click');
    component.find('Day button').at(10).simulate('click');

    expect(onChangeMock).toHaveBeenCalled();
    expect(component.find('WithStyles(Popover)').props().open).toBeFalsy();
  });
});

describe('e2e - InlineDatePicker onlyCalendar', () => {
  it('Should not render toolbar', () => {
    const component = mount(<DatePickerInline
      onlyCalendar
      date={utilsToUse.date('2018-01-01T00:00:00.000Z')}
      onChange={jest.fn()}
    />);

    component.find('input').simulate('click');
    expect(component.find('PickerToolbar').length).toBe(0);
  });
});
