import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  describeConformance,
  findOutermostIntrinsic,
} from '@material-ui/core/test-utils';
import OutlinedInput from './OutlinedInput';
import NotchedOutline from './NotchedOutline';

describe('<OutlinedInput />', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<OutlinedInput labelWidth={0} />, () => ({
    mount,
    only: ['refForwarding'],
    refInstanceof: window.HTMLDivElement,
  }));

  it('should render a <div />', () => {
    const wrapper = mount(<OutlinedInput labelWidth={0} />);
    assert.strictEqual(findOutermostIntrinsic(wrapper).type(), 'div');
  });

  it('should mount', () => {
    const wrapper = mount(<OutlinedInput labelWidth={0} />);
    assert.strictEqual(wrapper.find(NotchedOutline).length, 1);
  });
});
