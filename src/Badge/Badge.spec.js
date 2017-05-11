// @flow

import React from 'react';
import { createShallow } from 'src/test-utils';
import { assert } from 'chai';
import Badge, { styleSheet } from './Badge';

describe('<Badge />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  const testChildren = <div className="unique">Hello World</div>;

  it('renders children and badgeContent', () => {
    const wrapper = shallow(
      <Badge badgeContent={10}>{testChildren}</Badge>,
    );

    assert.strictEqual(wrapper.contains(testChildren), true, 'should contain the children');
    assert.ok(wrapper.find('span').length, 'should contain the badgeContent');
  });

  it('renders children and overwrite badge class', () => {
    const badgeClassName = 'testBadgeClassName';

    const wrapper = shallow(
      <Badge badgeContent={10} badgeClassName={badgeClassName}>{testChildren}</Badge>,
    );

    assert.strictEqual(wrapper.contains(testChildren), true, 'should contain the children');
    assert.strictEqual(wrapper.find('span').hasClass('testBadgeClassName'), true,
      'should contain the badgeClassName');
  });

  it('renders children by default', () => {
    const wrapper = shallow(
      <Badge badgeContent={10}>{testChildren}</Badge>,
    );

    assert.strictEqual(wrapper.contains(testChildren), true, 'should contain the children');
  });

  it('renders children and className', () => {
    const wrapper = shallow(
      <Badge badgeContent={10} className="testClassName">{testChildren}</Badge>,
    );

    assert.strictEqual(wrapper.contains(testChildren), true, 'should contain the children');
    assert.strictEqual(wrapper.is('.testClassName'), true, 'should contain the className');
  });

  it('renders children and have primary styles', () => {
    const wrapper = shallow(
      <Badge badgeContent={10} primary>{testChildren}</Badge>,
    );

    assert.strictEqual(wrapper.contains(testChildren), true, 'should contain the children');
    assert.strictEqual(wrapper.find('span').hasClass(classes.primary), true,
      'should have primary class');
  });

  it('renders children and have accent styles', () => {
    const wrapper = shallow(
      <Badge badgeContent={10} accent>{testChildren}</Badge>,
    );

    assert.strictEqual(wrapper.contains(testChildren), true, 'should contain the children');
    assert.strictEqual(wrapper.find('span').hasClass(classes.accent), true,
      'should have accent class');
  });

  it('renders children and overwrite root styles', () => {
    const style = {
      backgroundColor: 'red',
    };
    const wrapper = shallow(
      <Badge badgeContent={10} style={style}>{testChildren}</Badge>,
    );

    assert.strictEqual(wrapper.contains(testChildren), true, 'should contain the children');
    assert.strictEqual(wrapper.node.props.style.backgroundColor, style.backgroundColor,
      'should overwrite badge backgroundColor');
  });
});
