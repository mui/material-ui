import React from 'react';
import ToolbarButton from '../../_shared/ToolbarButton';
import { shallow } from '../test-utils';

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
