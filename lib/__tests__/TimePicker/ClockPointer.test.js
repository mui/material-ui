import React from 'react';
import { shallow } from 'enzyme';
import { ClockPointer } from '../../src/TimePicker/ClockPointer';

describe('ClockPointer', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ClockPointer classes={{}} />);
  });

  it('Should renders', () => {
    console.log(component.debug()); // TODO REMOVE ME
    expect(component).toBeTruthy();
  });
});
