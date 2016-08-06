// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import Backdrop, { styleSheet } from './Backdrop';

describe('<Backdrop>', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet, { group: 'mui' });
  });

  it('should render a backdrop div', () => {
    const wrapper = shallow(<Backdrop className="woof" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the woof class');
  });
});
