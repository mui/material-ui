import React from 'react';
import { mount, utilsToUse } from '../test-utils';
import TimePicker from '../../src/TimePicker/TimePicker';

describe('e2e - TimePicker', () => {
  let component;
  const onChangeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    component = mount(<TimePicker
      fadeTimeout={0}
      date={utilsToUse.date('2018-01-01T00:00:00.000Z')}
      onChange={onChangeMock}
    />);
  });

  it('Should renders', () => {
    expect(component).toBeTruthy();
  });

  it('Should submit onChange on moving', () => {
    component.find('Clock div[role="menu"]').simulate('mouseMove', {
      buttons: 1,
      nativeEvent: {
        offsetX: 20,
        offsetY: 15,
      },
    });

    if (process.env.UTILS === 'moment') {
      expect(onChangeMock).toHaveBeenCalled();
      return;
    }

    expect(onChangeMock).toHaveBeenCalledWith(utilsToUse.date('2018-01-01T09:00:00.000Z'), false);
  });

  it('Should submit hourview (mouse move)', () => {
    component.find('Clock div[role="menu"]').simulate('mouseUp', {
      nativeEvent: {
        offsetX: 20,
        offsetY: 15,
      },
    });

    if (process.env.UTILS === 'moment') {
      expect(onChangeMock).toHaveBeenCalled();
      return;
    }

    expect(onChangeMock).toHaveBeenCalledWith(utilsToUse.date('2018-01-01T09:00:00.000Z'), false);
  });

  it('Should change minutes (touch)', () => {
    component.setState({ isMinuteViewShown: true, isHourViewShown: false });
    component.find('Clock div[role="menu"]').simulate('touchMove', {
      buttons: 1,
      changedTouches: [{
        clientX: 20,
        clientY: 15,
      }],
    });

    if (process.env.UTILS === 'moment') {
      expect(onChangeMock).toHaveBeenCalled();
    } else {
      expect(onChangeMock).toHaveBeenCalledWith(utilsToUse.date('2018-01-01T09:00:00.000Z'), false);
    }

    component.find('Clock div[role="menu"]').simulate('touchEnd', {
      buttons: 1,
      changedTouches: [{
        clientX: 20,
        clientY: 15,
      }],
    });

    if (process.env.UTILS === 'moment') {
      expect(onChangeMock).toHaveBeenCalled();
    } else {
      expect(onChangeMock).toHaveBeenCalledWith(utilsToUse.date('2018-01-01T09:00:00.000Z'), false);
    }
  });
});

