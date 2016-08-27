// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import Divider, { styleSheet } from './Divider';

describe('<Divider>', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a hr', () => {
    const wrapper = shallow(
      <Divider />
    );
    assert.strictEqual(wrapper.is('hr'), true, 'should be a hr');
  });

  it('should render with the root class', () => {
    const wrapper = shallow(<Divider />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should set the absolute class', () => {
    const wrapper = shallow(<Divider absolute />);
    assert.strictEqual(wrapper.hasClass(classes.absolute), true, 'should be absolute');
  });
});
