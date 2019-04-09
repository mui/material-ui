import { ReactWrapper } from 'enzyme';
import * as React from 'react';
import DateTimePicker, { DateTimePickerProps } from '../../DateTimePicker/DateTimePickerRoot';
import { mount, utilsToUse } from '../test-utils';

describe('e2e - DateTimePicker', () => {
  let component: ReactWrapper<DateTimePickerProps>;
  const onChangeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    component = mount(
      <DateTimePicker
        date={utilsToUse.date('2018-01-01T00:00:00.000Z')}
        onChange={onChangeMock}
        openTo="hours"
        leftArrowIcon="keyboard_arrow_left"
        rightArrowIcon="keyboard_arrow_right"
        dateRangeIcon="date_range"
        timeIcon="access_time"
      />
    );
  });

  it('Should renders', () => {
    expect(component).toBeTruthy();
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

  it('Should render hour view', () => {
    component
      .find('ToolbarButton')
      .at(2)
      .simulate('click');
    expect(component.find('TimePickerView').props().type).toBe('hours');
  });

  it('Should render minutes view', () => {
    component
      .find('ToolbarButton')
      .at(3)
      .simulate('click');
    expect(component.find('TimePickerView').props().type).toBe('minutes');
  });

  it('Should change meridiem', () => {
    component
      .find('ToolbarButton')
      .at(5)
      .simulate('click');

    if (process.env.UTILS === 'moment') {
      expect(onChangeMock).toHaveBeenCalled();
      return;
    }

    expect(onChangeMock).toHaveBeenCalledWith(utilsToUse.date('2018-01-01T12:00:00.000Z'), false);
  });
});
