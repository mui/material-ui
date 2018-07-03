import React from 'react';
import { shallow } from '../test-utils';
import MaskedInput from '../../src/_shared/MaskedInput';

describe('ToolbarButton', () => {
  let component;

  beforeEach(() => {
    component = shallow(<MaskedInput mask={[]} />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
