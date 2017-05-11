// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from 'src/test-utils';
import DialogActions, { styleSheet } from './DialogActions';

describe('<DialogActions />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a div', () => {
    const wrapper = shallow(
      <DialogActions />,
    );
    assert.strictEqual(wrapper.name(), 'div');
  });

  it('should spread custom props on the root node', () => {
    const wrapper = shallow(<DialogActions data-my-prop="woof" />);
    assert.strictEqual(wrapper.prop('data-my-prop'), 'woof', 'custom prop should be woof');
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<DialogActions className="woof" />);
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should render children with the button class wrapped in a div with the action class', () => {
    const wrapper = shallow(
      <DialogActions>
        <button className="woof">Hello</button>
      </DialogActions>,
    );
    const container = wrapper.childAt(0);
    assert.strictEqual(container.hasClass(classes.action), true, 'should have the action wrapper');
    assert.strictEqual(container.is('div'), true, 'should be a div');
    const button = container.childAt(0);
    assert.strictEqual(button.is('button'), true, 'should be a button');
    assert.strictEqual(button.hasClass('woof'), true, 'should have the user class');
    assert.strictEqual(button.hasClass(classes.button), true, 'should have the button class');
  });
});
