import { ReactWrapper } from 'enzyme';
import * as React from 'react';
import TimePicker, { TimePickerProps } from '../../TimePicker/TimePickerRoot';
import { mount, utilsToUse } from '../test-utils';

describe('e2e - TimePicker', () => {
  let component: ReactWrapper<TimePickerProps>;
  const onChangeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    component = mount(
      <TimePicker date={utilsToUse.date('2018-01-01T00:00:00.000')} onChange={onChangeMock} />
    );
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

    expect(onChangeMock).toHaveBeenCalled();
  });

  it('Should submit hourview (mouse move)', () => {
    component.find('Clock div[role="menu"]').simulate('mouseUp', {
      nativeEvent: {
        offsetX: 20,
        offsetY: 15,
      },
    });

    expect(onChangeMock).toHaveBeenCalled();
  });

  it('Should change minutes (touch)', () => {
    component.setState({ openView: 'minutes' });
    component.find('Clock div[role="menu"]').simulate('touchMove', {
      buttons: 1,
      changedTouches: [
        {
          clientX: 20,
          clientY: 15,
        },
      ],
    });

    expect(onChangeMock).toHaveBeenCalled();

    component.find('Clock div[role="menu"]').simulate('touchEnd', {
      buttons: 1,
      changedTouches: [
        {
          clientX: 20,
          clientY: 15,
        },
      ],
    });

    expect(onChangeMock).toHaveBeenCalled();
  });
});
