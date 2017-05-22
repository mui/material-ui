// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from 'src/test-utils';
import CardActions, { styleSheet } from './CardActions';

describe('<CardActions />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a div with the cardActions class', () => {
    const wrapper = shallow(
      <CardActions />,
    );
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass(classes.cardActions), true,
      'should have the cardActions class');
  });

  it('should pass the actionSpacing class to children', () => {
    const child3 = false;
    const wrapper = shallow(
      <CardActions>
        <div id="child1" />
        <div id="child2" />
        {child3 && <div id="child3" />}
      </CardActions>,
    );

    assert.strictEqual(wrapper.find('#child1').hasClass(classes.actionSpacing), true);
    assert.strictEqual(wrapper.find('#child2').hasClass(classes.actionSpacing), true);
  });

  it('should not pass the actionSpacing class to children', () => {
    const wrapper = shallow(
      <CardActions disableActionSpacing>
        <div id="child1" />
        <div id="child2" />
      </CardActions>,
    );

    assert.strictEqual(wrapper.find('#child1').hasClass(classes.actionSpacing), false);
    assert.strictEqual(wrapper.find('#child2').hasClass(classes.actionSpacing), false);
  });
});
