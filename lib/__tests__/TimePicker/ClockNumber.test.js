import React from 'react';
import { shallow } from 'enzyme';
import { ClockNumber } from '../../src/TimePicker/ClockNumber';

describe('ClockNumber', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ClockNumber classes={{}} index={0} />);
  });

  it('Should renders', () => {
    console.log(component.debug()); // TODO REMOVE ME
    expect(component).toBeTruthy();
  });
});
