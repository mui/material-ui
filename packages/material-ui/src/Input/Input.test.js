import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  describeConformance,
  findOutermostIntrinsic,
} from '@material-ui/core/test-utils';
import Input from './Input';

describe('<Input />', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Input />, () => ({
    mount,
    only: ['refForwarding'],
    refInstanceof: window.HTMLDivElement,
  }));

  it('should render a <div />', () => {
    const wrapper = mount(<Input />);
    assert.strictEqual(findOutermostIntrinsic(wrapper).type(), 'div');
  });
});
