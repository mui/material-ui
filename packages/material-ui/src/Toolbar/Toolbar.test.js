import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  createShallow,
  describeConformance,
  findOutermostIntrinsic,
  getClasses,
} from '@material-ui/core/test-utils';
import Toolbar from './Toolbar';

describe('<Toolbar />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    shallow = createShallow({ dive: true });
    classes = getClasses(<Toolbar>foo</Toolbar>);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Toolbar />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
  }));

  it('should render with gutters class', () => {
    const wrapper = mount(<Toolbar className="woofToolbar">foo</Toolbar>);
    assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.gutters), true);
  });

  it('can disable the gutters', () => {
    const wrapper = shallow(<Toolbar disableGutters>foo</Toolbar>);
    assert.strictEqual(wrapper.hasClass(classes.gutters), false);
  });

  it('can condense itself', () => {
    const wrapper = shallow(<Toolbar variant="dense">foo</Toolbar>);
    assert.strictEqual(wrapper.hasClass(classes.dense), true);
  });
});
