import React from 'react';
import { shallow } from '../test-utils';
import ToolbarButton from '../../src/_shared/ToolbarButton';

describe('ToolbarButton', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ToolbarButton />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
