import React from 'react';
import { shallow } from '../test-utils';
import { Clock } from '../../src/TimePicker/components/Clock';

describe('Clock', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Clock classes={{}} />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
