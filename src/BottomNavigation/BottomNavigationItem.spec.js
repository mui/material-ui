// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import BottomNavigationItem, { styleSheet } from './BottomNavigationItem';

describe('<BottomNavigationItem>', () => {
  let shallow;
  let classes;
  const icon = <span className="material-icons">restore</span>;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a ButtonBase', () => {
    const wrapper = shallow(
      <BottomNavigationItem icon={icon} />
    );
    assert.strictEqual(wrapper.is('ButtonBase'), true, 'should be a ButtonBase');
  });

  it('should render with the root class', () => {
    const wrapper = shallow(<BottomNavigationItem icon={icon} />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<BottomNavigationItem className="woof" icon={icon} />);
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });
});
