// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from 'src/test-utils';
import CardContent, { styleSheet } from './CardContent';

describe('<CardContent />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a div with the cardContent class', () => {
    const wrapper = shallow(
      <CardContent />,
    );
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass(classes.cardContent), true,
      'should have the cardContent class');
  });
});
