// @flow weak

import React from 'react';
import { assert } from 'chai';
import { createShallow } from 'test/utils';
import Card, { styleSheet } from './Card';

describe('<Card />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render Paper with 2dp', () => {
    const wrapper = shallow(
      <Card />,
    );
    assert.strictEqual(wrapper.is('Paper'), true, 'should be Paper');
    assert.strictEqual(wrapper.prop('elevation'), 2);
  });

  it('should render Paper with 8dp', () => {
    const wrapper = shallow(
      <Card raised />,
    );
    assert.strictEqual(wrapper.is('Paper'), true, 'should be Paper');
    assert.strictEqual(wrapper.prop('elevation'), 8);
  });

  it('should have the card className', () => {
    const wrapper = shallow(
      <Card />,
    );
    assert.strictEqual(wrapper.hasClass(classes.card), true);
  });
});
