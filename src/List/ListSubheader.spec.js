// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import ListSubheader, { styleSheet } from './ListSubheader';

describe('<ListSubheader />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(styleSheet);
  });

  it('should render a div', () => {
    const wrapper = shallow(<ListSubheader />);
    assert.strictEqual(wrapper.name(), 'div');
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<ListSubheader className="woof" />);
    assert.strictEqual(wrapper.hasClass('woof'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should display primary color', () => {
    const wrapper = shallow(<ListSubheader color="primary" />);
    assert.strictEqual(
      wrapper.hasClass(classes.colorPrimary),
      true,
      'should have the primary class',
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should display inset class', () => {
    const wrapper = shallow(<ListSubheader inset />);
    assert.strictEqual(wrapper.hasClass(classes.inset), true, 'should have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
});
