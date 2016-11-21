// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import ListItemText, { styleSheet } from './ListItemText';

describe('<ListItemText />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a div', () => {
    const wrapper = shallow(
      <ListItemText />,
    );
    assert.strictEqual(wrapper.is('div'), true, 'should be a div');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<ListItemText className="woof" />);
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should render with no children', () => {
    const wrapper = shallow(<ListItemText />);
    assert.strictEqual(wrapper.children().length, 0, 'should have no children');
  });

  describe('prop: primary', () => {
    it('should render primary text', () => {
      const wrapper = shallow(
        <ListItemText primary="This is the primary text" />,
      );
      assert.strictEqual(wrapper.children().length, 1, 'should have 1 child');
      assert.strictEqual(wrapper.childAt(0).is('Text'), true, 'should render Text');
      assert.strictEqual(wrapper.childAt(0).prop('type'), 'subheading', 'should have the subheading type');
      assert.strictEqual(
        wrapper.childAt(0).children().equals('This is the primary text'),
        true,
        'should have the primary text',
      );
    });

    it('should use the primary node', () => {
      const primary = <span />;
      const wrapper = shallow(
        <ListItemText primary={primary} />,
      );
      assert.strictEqual(wrapper.contains(primary), true, 'should find the node');
    });
  });

  describe('prop: secondary', () => {
    it('should render secondary text', () => {
      const wrapper = shallow(
        <ListItemText
          secondary="This is the secondary text"
        />,
      );
      assert.strictEqual(wrapper.children().length, 1, 'should have 1 child');
      assert.strictEqual(wrapper.childAt(0).is('Text'), true, 'should render Text');
      assert.strictEqual(wrapper.childAt(0).props().type, 'body1', 'should have the body1 type');
      assert.strictEqual(wrapper.childAt(0).props().secondary, true, 'should have the secondary property');
      assert.strictEqual(
        wrapper.childAt(0).children().equals('This is the secondary text'),
        true,
        'should have the secondary text',
      );
    });

    it('should use the secondary node', () => {
      const secondary = <span />;
      const wrapper = shallow(
        <ListItemText secondary={secondary} />,
      );
      assert.strictEqual(wrapper.contains(secondary), true, 'should find the node');
    });
  });

  it('should render primary and secondary text', () => {
    const wrapper = shallow(
      <ListItemText
        primary="This is the primary text"
        secondary="This is the secondary text"
      />,
    );

    assert.strictEqual(wrapper.children().length, 2, 'should have 2 children');

    assert.strictEqual(wrapper.childAt(0).is('Text'), true, 'should render Text');
    assert.strictEqual(wrapper.childAt(0).props().type, 'subheading', 'should have the subheading type');
    assert.strictEqual(
      wrapper.childAt(0).children().equals('This is the primary text'),
      true,
      'should have the primary text',
    );

    assert.strictEqual(wrapper.childAt(1).is('Text'), true, 'should render Text');
    assert.strictEqual(wrapper.childAt(1).props().type, 'body1', 'should have the body1 type');
    assert.strictEqual(wrapper.childAt(1).props().secondary, true, 'should have the secondary property');
    assert.strictEqual(
      wrapper.childAt(1).children().equals('This is the secondary text'),
      true,
      'should have the secondary text',
    );
  });
});
