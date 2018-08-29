import React from 'react';
import { shallow } from '../test-utils';
import { Clock } from '../../src/TimePicker/components/Clock';

const mouseClockEvent = {
  preventDefault: jest.fn(),
  stopPropagation: jest.fn(),
  buttons: 1,
  nativeEvent: {
    offsetX: 10,
    offsetY: 25,
  },
};

describe('Clock', () => {
  let component;
  const onChangeMock = jest.fn();

  beforeEach(() => {
    onChangeMock.mockReset();
    component = shallow(<Clock type="minutes" onChange={onChangeMock} classes={{}} children={null} />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });

  it('Should set time on mouse move with click', () => {
    component.find('[role="menu"]').simulate('mouseMove', mouseClockEvent);

    expect(onChangeMock).toHaveBeenCalledWith(52, false);
  });

  it('Should set isMoving = false on mouse up', () => {
    component.instance().isMoving = true;
    component.find('[role="menu"]').simulate('mouseUp', mouseClockEvent);

    expect(component.instance().isMoving).toBeFalsy();
  });

  it('Should set time on touch move', () => {
    component.find('[role="menu"]')
      .simulate('touchMove', {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
        changedTouches: [{ clientX: 10, clientY: 15 }],
        target: {
          getBoundingClientRect: () => ({ left: 0, top: 0 }),
        },
      });

    expect(onChangeMock).toHaveBeenCalledWith(52, false);
  });

  it('Should set isMoving = false on touch end', () => {
    component.find('[role="menu"]').simulate('touchEnd');
    expect(component.instance().isMoving).toBeFalsy();
  });
});
