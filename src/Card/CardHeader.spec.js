// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import CardHeader, { styleSheet } from './CardHeader';

describe('<CardHeader />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render CardContent', () => {
    const wrapper = shallow(
      <CardHeader />,
    );
    assert.strictEqual(wrapper.is('CardContent'), true, 'should be CardContent');
  });

  it('should have the cardHeader class', () => {
    const wrapper = shallow(
      <CardHeader />,
    );
    assert.strictEqual(wrapper.hasClass(classes.cardHeader), true);
  });

  describe('without an avatar', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <CardHeader
          title="Title"
          subhead="Subhead"
        />,
      );
    });

    it('should render the title as headline text', () => {
      const title = wrapper.childAt(0);
      assert.strictEqual(title.is('Text'), true);
      assert.strictEqual(title.prop('type'), 'headline');
    });

    it('should render the subead as body1 secondary text', () => {
      const subhead = wrapper.childAt(1);
      assert.strictEqual(subhead.is('Text'), true);
      assert.strictEqual(subhead.prop('type'), 'body1');
      assert.strictEqual(subhead.prop('secondary'), true);
    });
  });

  describe('with an avatar', () => {
    let wrapper;
    let avatar;

    beforeEach(() => {
      avatar = <span />;
      wrapper = shallow(
        <CardHeader
          avatar={avatar}
          title="Title"
          subhead="Subhead"
        />,
      );
    });

    it('should render the avatar inside the first child', () => {
      const container = wrapper.childAt(0);

      assert.strictEqual(container.is('div'), true);
      assert.strictEqual(container.hasClass(classes.avatar), true);
      assert.strictEqual(container.childAt(0).equals(avatar), true);
    });

    it('should render the title as body2 text inside the second child', () => {
      const container = wrapper.childAt(1);
      assert.strictEqual(container.hasClass(classes.content), true,
        'should have the content class');
      const title = container.childAt(0);
      assert.strictEqual(title.is('Text'), true);
      assert.strictEqual(title.prop('type'), 'body2');
    });

    it('should render the subead as body2 secondary text inside the second child', () => {
      const container = wrapper.childAt(1);
      assert.strictEqual(container.hasClass(classes.content), true,
        'should have the content class');
      const subhead = container.childAt(1);
      assert.strictEqual(subhead.is('Text'), true);
      assert.strictEqual(subhead.prop('type'), 'body2');
      assert.strictEqual(subhead.prop('secondary'), true);
    });
  });
});
