import React from 'react';
import { shallow } from 'enzyme';
import Calendar from '../../src/DatePicker/Calendar';

describe('Calendar', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Calendar />);
  });

  it('Should renders', () => {
    console.log(component.debug()); // TODO REMOVE ME
    expect(component).toBeTruthy();
  });
});
