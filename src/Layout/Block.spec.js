// @flow weak
/* eslint-env mocha */
/* eslint react/prop-types: off */
import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext, createMountWithContext } from 'test/utils';
import Block from './Block';
import { styleSheet } from './with-layout';

describe('<Block /> component', () => {
  let shallow;
  let mount;
  let classes;
  before(() => {
    shallow = createShallowWithContext();
    mount = createMountWithContext();
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
      classes.layoutRow,
      classes.alignStretch,
      classes.justifyStart,
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
      />,
      );
    const className = wrapper.prop('className');
    assert.isOk(className, 'should have className prop');
    const classNames = className.split(' ');
    const expected = [
      classes.layoutRow,
      classes.layoutFill,
      classes.justifyStart,
      classes.alignStart,
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

  describe('flex props', () => {
    let wrapper;
    before(() => {
      wrapper = mount(
        <Block layout="row">
          <Block flex>just flex</Block>
          <Block flex={33}>flex 33%</Block>
          <Block flex={50}>flex 50%</Block>
          <Block flex="none">flex none</Block>
          <Block flex="grow">flex none</Block>
        </Block>,
      );
    });
    it('should have .flex class', () => {
      const actual = wrapper.childAt(0).find('div').prop('className');
      const expected = classes.flex;
      assert.strictEqual(actual, expected, `the class should be ${expected}`);
    });
    it('should have .flex33 class', () => {
      const actual = wrapper.childAt(1).find('div').prop('className');
      const expected = classes.flex33;
      assert.strictEqual(actual, expected, `the class should be ${expected}`);
    });
    it('should have .flex50 class', () => {
      const actual = wrapper.childAt(2).find('div').prop('className');
      const expected = classes.flex50;
      assert.strictEqual(actual, expected, `the class should be ${expected}`);
    });
    it('should have .flexNone class', () => {
      const actual = wrapper.childAt(3).find('div').prop('className');
      const expected = classes.flexNone;
      assert.strictEqual(actual, expected, `the class should be ${expected}`);
    });
    it('should have .flex-grow class', () => {
      const actual = wrapper.childAt(4).find('div').prop('className');
      const expected = classes.flexGrow;
      assert.strictEqual(actual, expected, `the class should be ${expected}`);
    });
  });
});
