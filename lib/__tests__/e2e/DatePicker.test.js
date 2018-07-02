import React from 'react';
import { mount, utilsToUse } from '../test-utils';
import DatePicker from '../../src/DatePicker/DatePicker';

describe('e2e - DatePicker', () => {
  let component;
  const onChangeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    component = mount(<DatePicker
      animateYearScrolling={false}
      date={utilsToUse.date('2018-01-01T00:00:00.000Z')}
      onChange={onChangeMock}
    />);
  });

  it('Should renders', () => {
    expect(component).toBeTruthy();
  });

  it('Should render proper count of days', () => {
    expect(component.find('Day').length).toBe(35);
  });

  it('Should dispatch onChange on day click', () => {
    component.find('Day button').at(2).simulate('click');
    expect(onChangeMock).toHaveBeenCalled();
  });

  it('Should render year selection', () => {
    component.find('ToolbarButton').first().simulate('click');
    expect(component.find('Year').length).toBe(201);

    component.find('Year').at(1).simulate('click');
    expect(onChangeMock).toHaveBeenCalled();
  });
});

