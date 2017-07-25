// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import CardMedia, { styleSheet } from './CardMedia';

describe('<CardMedia />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ untilSelector: 'CardMedia' });
    classes = getClasses(styleSheet);
  });

  it('should have the root class', () => {
    const wrapper = shallow(<CardMedia />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
});
