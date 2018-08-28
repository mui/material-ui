import React from 'react';
import { shallow } from '../test-utils';
import { ClockNumber } from '../../src/TimePicker/components/ClockNumber';

describe('ClockNumber', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ClockNumber classes={{}} index={0} />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
