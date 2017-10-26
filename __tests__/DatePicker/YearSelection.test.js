import React from 'react';
import { shallow } from 'enzyme';
import YearSelection from '../../src/DatePicker/YearSelection';

describe('YearSelection', () => {
  let component;

  beforeEach(() => {
    component = shallow(<YearSelection /> );
  });

  it('Should renders', () => {
    console.log(component.debug()); // TODO REMOVE ME
    expect(component).toBeTruthy();
  });
});
