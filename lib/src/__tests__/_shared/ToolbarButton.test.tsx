import { ShallowWrapper } from 'enzyme';
import * as React from 'react';
import ToolbarButton, { ToolbarButtonProps } from '../../_shared/ToolbarButton';
import { shallow } from '../test-utils';

describe('ToolbarButton', () => {
  let component: ShallowWrapper<ToolbarButtonProps>;

  beforeEach(() => {
    component = shallow(<ToolbarButton selected={true} label="foo" />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
