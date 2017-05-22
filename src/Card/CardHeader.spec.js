// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from 'src/test-utils';
import CardHeader, { styleSheet } from './CardHeader';

describe('<CardHeader />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render CardContent', () => {
    const wrapper = shallow(
      <CardHeader />,
    );
    assert.strictEqual(wrapper.name(), 'withStyles(CardContent)');
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
        <CardHeader title="Title" subheader="Subheader" />,
      ).childAt(0);
    });

    it('should render the title as headline text', () => {
      const title = wrapper.childAt(0);
      assert.strictEqual(title.name(), 'withStyles(Typography)');
      assert.strictEqual(title.props().type, 'headline');
    });

    it('should render the subeader as body1 secondary text', () => {
      const subheader = wrapper.childAt(1);
      assert.strictEqual(subheader.name(), 'withStyles(Typography)');
      assert.strictEqual(subheader.props().type, 'body1');
      assert.strictEqual(subheader.props().secondary, true);
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
          subheader="Subhead"
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
      assert.strictEqual(title.name(), 'withStyles(Typography)');
      assert.strictEqual(title.props().type, 'body2');
    });

    it('should render the subeader as body2 secondary text inside the second child', () => {
      const container = wrapper.childAt(1);
      assert.strictEqual(container.hasClass(classes.content), true,
        'should have the content class');
      const subheader = container.childAt(1);
      assert.strictEqual(subheader.name(), 'withStyles(Typography)');
      assert.strictEqual(subheader.props().type, 'body2');
      assert.strictEqual(subheader.props().secondary, true);
    });
  });
});
