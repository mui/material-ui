import React from 'react';
import { shallow } from '../test-utils';
import { ClockPointer } from '../../TimePicker/components/ClockPointer';

describe('ClockPointer', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ClockPointer classes={{}} />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
