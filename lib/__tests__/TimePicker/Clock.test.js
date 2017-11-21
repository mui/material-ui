import React from 'react';
import { shallow } from 'enzyme';
import { Clock } from '../../src/TimePicker/Clock';

describe('Clock', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Clock classes={{}} />);
  });

  it('Should renders', () => {
    console.log(component.debug()); // TODO REMOVE ME
    expect(component).toBeTruthy();
  });
});
