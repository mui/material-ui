import React from 'react';
import { mount, utilsToUse } from '../test-utils';
import DateTimePicker from '../../src/DateTimePicker/DateTimePicker';

describe('e2e - DateTimePicker', () => {
  let component;
  const onChangeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    component = mount(<DateTimePicker
      openTo="days"
      fadeTimeout={0}
      date={utilsToUse.date('2018-01-01T00:00:00.000Z')}
      onChange={onChangeMock}
    />);
  });

  it('Should renders', () => {
    expect(component).toBeTruthy();
  });

  it('Should render year selection', () => {
    component.find('ToolbarButton').first().simulate('click');
    expect(component.find('Year').length).toBe(201);

    console.log(component.debug());

    component.find('Year').at(1).simulate('click');
    expect(onChangeMock).toHaveBeenCalled();
  });
});

