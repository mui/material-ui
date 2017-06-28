// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import DialogContent, { styleSheet } from './DialogContent';

describe('<DialogContent />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a div', () => {
    const wrapper = shallow(<DialogContent />);
    assert.strictEqual(wrapper.name(), 'div');
  });

  it('should spread custom props on the root node', () => {
    const wrapper = shallow(<DialogContent data-my-prop="woof" />);
    assert.strictEqual(wrapper.prop('data-my-prop'), 'woof', 'custom prop should be woof');
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<DialogContent className="woof" />);
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should render children', () => {
    const children = <p />;
    const wrapper = shallow(
      <DialogContent>
        {children}
      </DialogContent>,
    );
    assert.strictEqual(wrapper.children().equals(children), true);
  });
});
