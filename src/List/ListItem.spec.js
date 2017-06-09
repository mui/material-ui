// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import ListItem, { styleSheet } from './ListItem';
import ListItemText from './ListItemText';
import ListItemSecondaryAction from './ListItemSecondaryAction';

describe('<ListItem />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a div', () => {
    const wrapper = shallow(<ListItem />);
    assert.strictEqual(wrapper.name(), 'div');
  });

  it('should render a li', () => {
    const wrapper = shallow(<ListItem component="li" />);
    assert.strictEqual(wrapper.name(), 'li');
  });

  it('should render with the user, root and gutters classes', () => {
    const wrapper = shallow(<ListItem className="woof" />);
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.gutters), true, 'should have the gutters class');
  });

  it('should disable the gutters', () => {
    const wrapper = shallow(<ListItem disableGutters />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(
      wrapper.hasClass(classes.gutters),
      false,
      'should not have the gutters class',
    );
  });

  describe('prop: button', () => {
    it('should render a div', () => {
      const wrapper = shallow(<ListItem button />);
      assert.strictEqual(wrapper.props().component, 'div');
    });
  });

  describe('prop: component', () => {
    it('should change the component', () => {
      const wrapper = shallow(<ListItem button component="a" />);
      assert.strictEqual(wrapper.props().component, 'a');
    });
  });

  describe('context: dense', () => {
    it('should forward the context', () => {
      const wrapper = shallow(<ListItem />);
      assert.strictEqual(
        wrapper.instance().getChildContext().dense,
        false,
        'dense should be false by default',
      );

      wrapper.setProps({
        dense: true,
      });
      assert.strictEqual(
        wrapper.instance().getChildContext().dense,
        true,
        'dense should be true when set',
      );
    });
  });

  describe('secondary action', () => {
    it('should wrap with a container', () => {
      const wrapper = shallow(
        <ListItem>
          <ListItemText primary="primary" />
          <ListItemSecondaryAction />
        </ListItem>,
      );
      assert.strictEqual(wrapper.hasClass(classes.container), true);
    });
  });
});
