// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import ExpansionPanelActions from './ExpansionPanelActions';

describe('<ExpansionPanelActions />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<ExpansionPanelActions />);
  });

  it('should render a div', () => {
    const wrapper = shallow(<ExpansionPanelActions />);
    assert.strictEqual(wrapper.name(), 'div');
  });

  it('should spread custom props on the root node', () => {
    const wrapper = shallow(<ExpansionPanelActions data-my-prop="woofExpansionPanelActions" />);
    assert.strictEqual(
      wrapper.prop('data-my-prop'),
      'woofExpansionPanelActions',
      'custom prop should be woofExpansionPanelActions',
    );
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<ExpansionPanelActions className="woofExpansionPanelActions" />);
    assert.strictEqual(wrapper.hasClass('woofExpansionPanelActions'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render children with the button class wrapped in a div with the action class', () => {
    const wrapper = shallow(
      <ExpansionPanelActions>
        <button className="woofExpansionPanelActions">Hello</button>
      </ExpansionPanelActions>,
    );
    const container = wrapper.childAt(0);
    assert.strictEqual(container.hasClass(classes.action), true, 'should have the action wrapper');
    assert.strictEqual(container.is('div'), true, 'should be a div');
    const button = container.childAt(0);
    assert.strictEqual(button.is('button'), true, 'should be a button');
    assert.strictEqual(
      button.hasClass('woofExpansionPanelActions'),
      true,
      'should have the user class',
    );
    assert.strictEqual(button.hasClass(classes.button), true, 'should have the button class');
  });

  it('should render a valid children', () => {
    const wrapper = shallow(
      <ExpansionPanelActions>
        <button>Hello</button>
        {null}
      </ExpansionPanelActions>,
    );

    const container = wrapper.childAt(0);
    assert.strictEqual(container.hasClass(classes.action), true, 'should have the action wrapper');
    assert.strictEqual(container.is('div'), true, 'should be a div');
    const button = container.childAt(0);
    assert.strictEqual(container.children().length, 1, 'should have only one element');
    assert.strictEqual(button.is('button'), true, 'should be a button');
  });
});
