// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import List, { styleSheet } from './List';
import ListSubheader from './ListSubheader';

describe('<List />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a div', () => {
    const wrapper = shallow(
      <List />,
    );
    assert.strictEqual(wrapper.is('div'), true, 'should be a div');
  });

  it('should render a ul', () => {
    const wrapper = shallow(
      <List component="ul" />,
    );
    assert.strictEqual(wrapper.is('ul'), true, 'should be a ul');
  });

  it('should render with the user, root and padding classes', () => {
    const wrapper = shallow(<List className="woof" />);
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.padding), true, 'should have the padding class');
  });

  it('should disable the padding', () => {
    const wrapper = shallow(<List padding={false} />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.padding), false,
      'should not have the padding class');
  });

  describe('prop: subheader', () => {
    it('should render with subheader class', () => {
      const wrapper = shallow(<List subheader={<ListSubheader>Title</ListSubheader>} />);
      assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
      assert.strictEqual(wrapper.hasClass(classes.subheader), true,
        'should have the subheader class');
    });

    it('should render ListSubheader', () => {
      const wrapper = shallow(<List subheader={<ListSubheader>Title</ListSubheader>} />);
      assert.strictEqual(wrapper.find(ListSubheader).length, 1, 'should render ListSubheader');
    });
  });
});
