import React from 'react';
import { mount, utilsToUse } from '../test-utils';
import { DateTimePickerWrapper } from '../../src/DateTimePicker/DateTimePickerWrapper';

const format = process.env.UTILS === 'luxon' ? 'MM/dd/yyyy hh:mm' : 'MM/DD/YYYY HH:mm';
describe('e2e - DateTimePickerWrapper', () => {
  let component;
  const onChangeMock = jest.fn();

  beforeEach(() => {
    component = mount(<DateTimePickerWrapper
      classes={{}}
      format={format}
      value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
      onChange={onChangeMock}
    />);
  });

  it('Should renders', () => {
    expect(component).toBeTruthy();
  });

  it('Should open modal with picker on click', () => {
    component.find('input').simulate('click');
    expect(component.find('Dialog').props('open')).toBeTruthy();
  });

  it('Should update state when passing new value from outside', () => {
    component.setProps({ value: '2019-01-01T00:00:00.000Z' });
    component.update(); // make additional react tick to update text field

    const expectedString = utilsToUse.format(utilsToUse.date('2019-01-01T00:00:00.000Z'), format);
    expect(component.find('input').props().value).toBe(expectedString);
  });

  it('Should change internal state on update', () => {
    component.find('input').simulate('click');
    component.find('Day button').at(3).simulate('click');

    expect(component.find('ToolbarButton').at(0).text()).toBe('2018');
    expect(component.find('ToolbarButton').at(1).text()).toBe('Jan 3');
  });

  it('Should handle accept on enter', () => {
    component.find('input').simulate('click');
    component.find('ModalDialog').props().onKeyDown({
      keyCode: 13, // enter
      preventDefault: jest.fn(),
    });

    expect(onChangeMock).toHaveBeenCalled();
  });
});


describe('e2e - DateTimePickerWrapper keyboard', () => {
  const onChangeMock = jest.fn();

  it('Should apply keyboard input', () => {
    const component = mount(<DateTimePickerWrapper
      keyboard
      classes={{}}
      format={format}
      value={utilsToUse.date('2018-01-01T00:00:00.000+00:00')}
      onChange={onChangeMock}
    />);

    component.find('input').simulate('change', { target: { value: '02/01/2018 00:00' } });
    component.find('input').simulate('blur');

    expect(onChangeMock).toHaveBeenCalled();
  }); be;
});

