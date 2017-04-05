// @flow weak

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow } from 'src/test-utils';
import Tab, { styleSheet } from './Tab';
import Icon from '../Icon';

describe('<Tab />', () => {
  let shallow;
  let classes;
  const icon = <Icon>restore</Icon>;

  before(() => {
    shallow = createShallow();
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

  describe('prop: disabled', () => {
    it('should render with the disabled and root classes', () => {
      const wrapper = shallow(
        <Tab disabled textColor="accent" />,
      );
      assert.strictEqual(wrapper.hasClass(classes.rootAccentDisabled), true);
      assert.strictEqual(wrapper.hasClass(classes.rootAccent), true);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
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

  describe('prop: labelClassName', () => {
    it('should render label with a custom label class', () => {
      const wrapper = shallow(<Tab label="foo" labelClassName="MyLabel" />);
      const label = wrapper.childAt(0);
      assert.strictEqual(label.hasClass(classes.label), true);
      assert.strictEqual(label.hasClass('MyLabel'), true);
    });
  });

  describe('prop: icon', () => {
    it('should render icon element', () => {
      const wrapper = shallow(<Tab icon={icon} />);
      const iconWrapper = wrapper.childAt(0);
      assert.strictEqual(iconWrapper.is('Icon'), true);
    });

    it('should render a font icon if a icon string is provided', () => {
      const wrapper = shallow(<Tab icon="book" />);
      assert.strictEqual(wrapper.find('Icon').length, 1,
        'should have an Icon');
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
    it('should have the fullWidth class', () => {
      const wrapper = shallow(<Tab fullWidth />);
      assert.strictEqual(wrapper.hasClass(classes.fullWidth), true);
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
