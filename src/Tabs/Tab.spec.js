// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallowWithContext } from 'test/utils';
import Tab, { styleSheet } from './Tab';

describe('<Tab />', () => {
  let shallow;
  let classes;
  const icon = <span className="material-icons">restore</span>;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render with the root class', () => {
    const wrapper = shallow(
      <Tab />,
    );
    assert.strictEqual(wrapper.is('ButtonBase'), true, 'should be a ButtonBase');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  describe('prop: className', () => {
    it('should render with the user and root classes', () => {
      const wrapper = shallow(<Tab className="woof" />);
      assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
      assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    });
  });

  describe('prop: selected', () => {
    it('should render with the selected and root classes', () => {
      const wrapper = shallow(
        <Tab selected textColor="accent" />,
      );
      assert.strictEqual(wrapper.hasClass(classes.rootAccentSelected), true);
      assert.strictEqual(wrapper.hasClass(classes.rootAccent), true);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.props()['aria-selected'], true);
    });
  });

  describe('prop: onClick', () => {
    it('should be called when a click is triggered', () => {
      const handleClick = spy();
      const wrapper = shallow(
        <Tab onClick={handleClick} onChange={() => {}} />,
      );
      wrapper.simulate('click');
      assert.strictEqual(handleClick.callCount, 1, 'it should forward the onClick');
    });
  });

  describe('prop: label', () => {
    it('should render label with the label class', () => {
      const wrapper = shallow(<Tab label="foo" />);
      const label = wrapper.childAt(0);
      assert.strictEqual(label.hasClass(classes.label), true);
    });
  });

  describe('prop: icon', () => {
    it('should render icon element', () => {
      const wrapper = shallow(<Tab icon={icon} />);
      const iconWrapper = wrapper.childAt(0);
      assert.strictEqual(iconWrapper.hasClass('material-icons'), true);
    });

    it('should render a font icon if a icon string is passed', () => {
      const wrapper = shallow(<Tab icon="book" />);
      assert.strictEqual(wrapper.find('.material-icons').length, 1, 'should have the material icons class');
    });
  });

  describe('prop: textColor', () => {
    it('should support the inherit value', () => {
      const wrapper = shallow(
        <Tab selected textColor="inherit" />,
      );
      assert.strictEqual(wrapper.hasClass(classes.rootInheritSelected), true);
      assert.strictEqual(wrapper.hasClass(classes.rootInherit), true);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
    });

    it('should support an arbitrary value', () => {
      const textColor = '#eee';
      const wrapper = shallow(
        <Tab selected textColor={textColor} />,
      );
      assert.strictEqual(wrapper.props().style.color, textColor);
    });
  });

  describe('prop: fullWidth', () => {
    it('should apply a specific width', () => {
      const wrapper = shallow(<Tab fullWidth />);
      assert.strictEqual(wrapper.props().style.width, '100%');
    });
  });

  describe('prop: style', () => {
    it('should be able to override everything', () => {
      const style = {
        width: '80%',
        color: 'red',
        alignText: 'center',
      };
      const wrapper = shallow(<Tab fullWidth textColor="#eee" style={style} />);
      assert.deepEqual(wrapper.props().style, style);
    });
  });
});
