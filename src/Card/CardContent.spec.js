// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import CardContent, { styleSheet } from './CardContent';

describe('<CardContent />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ untilSelector: 'CardContent' });
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a div with the root class', () => {
    const wrapper = shallow(<CardContent />);
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });
});
