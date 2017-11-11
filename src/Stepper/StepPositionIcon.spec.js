/* eslint-disable flowtype/require-valid-file-annotation */
import React from 'react';
import { assert } from 'chai';
import { createShallow, createMount } from '../test-utils';
import StepPositionIcon from './StepPositionIcon';
import SvgIcon from '../SvgIcon';

describe('<StepPositionIcon />', () => {
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('renders a <SvgIcon>', () => {
    const wrapper = shallow(<StepPositionIcon position={1} />);
    assert.strictEqual(wrapper.find(SvgIcon).length, 1);
  });

  it('sets active className when active = true', () => {
    const wrapper = shallow(<StepPositionIcon position={1} active />);
    assert.include(wrapper.find(SvgIcon).props().className, 'active');
  });

  it('contains text "3" when position is "3"', () => {
    const wrapper = shallow(<StepPositionIcon position={3} />);
    assert.strictEqual(wrapper.find('text').text(), '3');
  });
});
