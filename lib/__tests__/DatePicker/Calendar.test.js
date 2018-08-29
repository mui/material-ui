import React from 'react';
import { shallow, utilsToUse } from '../test-utils';
import { Calendar } from '../../src/DatePicker/components/Calendar';

describe('Calendar', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Calendar classes={{}} date={utilsToUse.date('01-01-2017')} />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});

describe('Calendar - disabled selected date on mount', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Calendar
      classes={{}}
      date={utilsToUse.date('01-01-2017')}
      minDate="01-01-2018"
      onChange={jest.fn()}
    />);
  });

  it('Should dispatch onDateSelect with isFinish = false on mount', () => {
    const { onChange } = component.instance().props;
    expect(onChange).toHaveBeenCalledWith(utilsToUse.date('01-01-2018'), false);
  });
});

describe('Calendar - keyboard control', () => {
  let component;
  const onChangeMock = jest.fn();

  beforeEach(() => {
    component = shallow(<Calendar
      classes={{}}
      date={utilsToUse.date('01-01-2017')}
      minDate="01-01-2018"
      onChange={onChangeMock}
      theme={{ direction: 'lrt' }}
      allowKeyboardControl
    />);
  });

  it('Should render go to prev week on up', () => {
    component.find('EventListener').props().onKeyDown({ keyCode: 38, preventDefault: jest.fn() });
    expect(onChangeMock).toHaveBeenCalled();
  });

  it('Should render go to next week on down', () => {
    component.find('EventListener').simulate('keyDown', { keyCode: 40, preventDefault: jest.fn() });
    expect(onChangeMock).toHaveBeenCalled();
  });

  it('Should render go to prev week on up', () => {
    component.find('EventListener').simulate('keyDown', { keyCode: 37, preventDefault: jest.fn() });
    expect(onChangeMock).toHaveBeenCalled();
  });

  it('Should render go to prev week on up', () => {
    component.find('EventListener').simulate('keyDown', { keyCode: 39, preventDefault: jest.fn() });
    expect(onChangeMock).toHaveBeenCalled();
  });
});
