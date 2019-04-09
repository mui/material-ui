import * as React from 'react';
import ToolbarText, { ToolbarTextProps } from '../../_shared/ToolbarText';
import { ShallowWrapper } from 'enzyme';
import { shallow } from '../test-utils';

describe('Toolbar Text', () => {
  let component: ShallowWrapper<ToolbarTextProps>;

  beforeEach(() => {
    component = shallow(<ToolbarText selected={true} label="hello" />);
  });

  it('Should render', () => {
    expect(component).toBeTruthy();
  });
});
