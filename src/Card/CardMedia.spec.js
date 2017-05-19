// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from 'src/test-utils';
import CardMedia, { styleSheet } from './CardMedia';

describe('<CardMedia />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should have the cardMedia class', () => {
    const wrapper = shallow(
      <CardMedia />,
    );
    assert.strictEqual(wrapper.hasClass(classes.cardMedia), true);
  });
});
