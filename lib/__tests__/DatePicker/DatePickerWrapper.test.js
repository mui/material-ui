import React from 'react';
import { shallow, utilsToUse } from '../test-utils';
import { DatePickerWrapper } from '../../src/DatePicker/DatePickerWrapper';

const spy = jest.fn();

const props = {
  keyboard: true,
  format: 'YYYY',
  onChange: spy,
  value: utilsToUse.date('2018', 'YYYY'),
};

describe('DatePickerWrapper', () => {
  let component;

  beforeEach(() => {
    component = shallow(<DatePickerWrapper {...props} />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });

  // 20.02.2018 -> TODO Move keyboard input tests to the text field

  // it('Should support keyboard input', () => {
  //   const input = component.find('input');
  //   input.simulate('change', { target: { value: '2019' } });

  //   expect(spy).toHaveBeenCalled();
  //   expect(component.state().date.format()).toEqual(utilsToUse.date('2019', 'YYYY').format());
  // });

  // it('Should not pass disabled dates', () => {
  //   component.setProps({
  //     disableFuture: true,
  //   });
  //   const input = component.find('input');
  //   input.simulate('change', { target: { value: '4000' } });

  //   expect(spy).toHaveBeenCalled();
  //   expect(component.state().date.format()).toEqual(utilsToUse.date(new Date().getFullYear(), 'YYYY').format());
  // });
});
