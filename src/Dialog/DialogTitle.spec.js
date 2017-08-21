// @flow

import * as React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import DialogTitle from './DialogTitle';

describe('<DialogTitle />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<DialogTitle />);
  });

  it('should render a div', () => {
    const wrapper = shallow(<DialogTitle />);
    assert.strictEqual(wrapper.name(), 'div');
  });

  it('should spread custom props on the root node', () => {
    const wrapper = shallow(<DialogTitle data-my-prop="woofDialogTitle" />);
    assert.strictEqual(
      wrapper.prop('data-my-prop'),
      'woofDialogTitle',
      'custom prop should be woofDialogTitle',
    );
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<DialogTitle className="woofDialogTitle" />);
    assert.strictEqual(wrapper.hasClass('woofDialogTitle'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render JSX children', () => {
    const children = <p className="test">Hello</p>;
    const wrapper = shallow(
      <DialogTitle disableTypography>
        {children}
      </DialogTitle>,
    );
    assert.strictEqual(wrapper.childAt(0).equals(children), true);
  });

  it('should render string children as given string', () => {
    const children = 'Hello';
    const wrapper = shallow(
      <DialogTitle>
        {children}
      </DialogTitle>,
    );
    assert.strictEqual(wrapper.childAt(0).props().children, children);
  });
});
