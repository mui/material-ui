import React from 'react';
import { assert } from 'chai';
import { createMount, createShallow, getClasses, testRef } from '@material-ui/core/test-utils';
import ListSubheader from '../ListSubheader';
import List from './List';

describe('<List />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    mount = createMount();
    shallow = createShallow({ dive: true });
    classes = getClasses(<List />);
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a div', () => {
    const wrapper = shallow(<List component="div" />);
    assert.strictEqual(wrapper.name(), 'div');
  });

  it('should render a ul', () => {
    const wrapper = shallow(<List />);
    assert.strictEqual(wrapper.name(), 'ul');
  });

  it('should render with the user, root and padding classes', () => {
    const wrapper = shallow(<List className="woofList" />);
    assert.strictEqual(wrapper.hasClass('woofList'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.padding), true);
  });

  it('should disable the padding', () => {
    const wrapper = shallow(<List disablePadding />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(
      wrapper.hasClass(classes.padding),
      false,
      'should not have the padding class',
    );
  });

  it('does forward refs', () => {
    testRef(<List />, mount);
  });

  describe('prop: subheader', () => {
    it('should render with subheader class', () => {
      const wrapper = shallow(<List subheader={<ListSubheader>Title</ListSubheader>} />);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(
        wrapper.hasClass(classes.subheader),
        true,
        'should have the subheader class',
      );
    });

    it('should render ListSubheader', () => {
      const wrapper = shallow(<List subheader={<ListSubheader>Title</ListSubheader>} />);
      assert.strictEqual(wrapper.find(ListSubheader).length, 1);
    });
  });

  describe('context: dense', () => {
    it('should forward the context', () => {
      const wrapper1 = shallow(<List />);
      assert.strictEqual(
        wrapper1.hasClass(classes.dense),
        false,
        'dense should be false by default',
      );

      const wrapper2 = shallow(<List dense />);
      assert.strictEqual(wrapper2.hasClass(classes.dense), true);
    });
  });
});
