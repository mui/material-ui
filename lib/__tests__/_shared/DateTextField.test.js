import React from 'react';
import { shallow } from 'enzyme';
import DateTextField from '../../src/_shared/DateTextField';

describe('DateTextField', () => {
  let component;

  beforeEach(() => {
    component = shallow(<DateTextField />);
  });

  it('Should renders', () => {
    console.log(component.debug()); // TODO REMOVE ME
    expect(component).toBeTruthy();
  });
});
