import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import DatePickerWrapper from '../../src/DatePicker/DatePickerWrapper';

const spy = jest.fn();

const props = {
  keyboard: true,
  format: 'YYYY',
  onChange: spy,
  value: moment('2018', 'YYYY'),
};

describe('DatePickerWrapper', () => {
  let component;

  beforeEach(() => {
    component = mount(<DatePickerWrapper {...props} />);
  });

  it('Should renders', () => {
    // console.log(component.debug()); // TODO REMOVE ME
    expect(component).toBeTruthy();
  });

  it('Should support keyboard input', () => {
    const input = component.find('input');
    input.simulate('change', { target: { value: '2019' } });

    expect(spy).toHaveBeenCalled();
    expect(component.state().date.format()).toEqual(moment('2019', 'YYYY').format());
  });
});
