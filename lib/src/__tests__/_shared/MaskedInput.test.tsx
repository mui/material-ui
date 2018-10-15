import React from 'react';
import MaskedInput from '../../_shared/MaskedInput';
import { shallow } from '../test-utils';

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
