import React from 'react';
import { shallow } from 'enzyme';
import TimePicker from '../../src/TimePicker/TimePicker';

describe('TimePicker', () => {
  let component;

  beforeEach(() => {
    component = shallow(<TimePicker />);
  });

  it('Should renders', () => {
    console.log(component.debug()); // TODO REMOVE ME
    expect(component).toBeTruthy();
  });
});
