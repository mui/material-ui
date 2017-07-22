// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Toolbar, { styleSheet } from './Toolbar';

describe('<Toolbar />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(styleSheet);
  });

  it('should render a div', () => {
    const wrapper = shallow(<Toolbar />);
    assert.strictEqual(wrapper.name(), 'div');
  });

  it('should render with the user, root and gutters classes', () => {
    const wrapper = shallow(<Toolbar className="woof" />);
    assert.strictEqual(wrapper.hasClass('woof'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.gutters), true);
  });

  it('should disable the gutters', () => {
    const wrapper = shallow(<Toolbar disableGutters />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(
      wrapper.hasClass(classes.gutters),
      false,
      'should not have the gutters class',
    );
  });
});
