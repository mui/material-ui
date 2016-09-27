// @flow weak
/* eslint-env mocha */
/* eslint react/prop-types: off */
import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import Block from './Block';
import { styleSheet } from './with-layout';

describe('<Block /> component', () => {
  let shallow;
  let classes;
  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });
  it('Renders a div', () => {
    const wrapper = shallow(<Block />);
    assert.isTrue(wrapper.is('div'), 'should be a div');
  });

  it('should render with layout classes', () => {
    const wrapper = shallow(<Block layout="row" />);
    const className = wrapper.prop('className');
    assert.isOk(className, 'should have className prop');
    const classNames = className.split(' ');
    const expected = [
      classes['layout-row'],
      classes['align-stretch'],
      classes['justify-start'],
    ];
    assert.sameMembers(classNames, expected, `should have className prop be ${expected.join(' ')}`);
  });
  it('should create layout algin and justify property', () => {
    const wrapper = shallow(
      <Block
        layout="row"
        fill
        align="start"
        justify="start"
      />
      );
    const className = wrapper.prop('className');
    assert.isOk(className, 'should have className prop');
    const classNames = className.split(' ');
    const expected = [
      classes['layout-row'],
      classes['layout-fill'],
      classes['justify-start'],
      classes['align-start'],
    ];
    assert.sameMembers(classNames, expected, `should have className prop be ${expected.join(' ')}`);
  });

  it('should render child component.', () => {
    const wrapper = shallow(<Block layout="row"><span>Hello</span></Block>);
    assert.isTrue(wrapper.childAt(0).is('span'), 'should be a `span`');
  });

  it('should include the existing className', () => {
    const wrapper = shallow(<Block className="someClass" layout="row"><span>Hello</span></Block>);
    const className = wrapper.prop('className');
    assert.isOk(className, 'should have className prop');
    assert.include(className, 'someClass', '`someClass` class name be part of `className` prop');
  });
});
