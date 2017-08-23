// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Icon from './Icon';

describe('<Icon />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Icon />);
  });

  it('renders children by default', () => {
    const wrapper = shallow(<Icon>account_circle</Icon>);
    assert.strictEqual(wrapper.contains('account_circle'), true, 'should contain the children');
  });

  it('should render an span with root class', () => {
    const wrapper = shallow(<Icon>account_circle</Icon>);
    assert.strictEqual(wrapper.name(), 'span');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the "root" class');
  });

  it('should spread props on span', () => {
    const wrapper = shallow(<Icon data-test="hello">account_circle</Icon>);
    assert.strictEqual(wrapper.prop('data-test'), 'hello', 'should be spread on the span');
  });

  describe('optional classes', () => {
    it('should render with the user class', () => {
      const wrapper = shallow(<Icon className="meow">account_circle</Icon>);
      assert.strictEqual(wrapper.hasClass('meow'), true, 'should have the "meow" class');
    });

    it('should render with the accent color', () => {
      const wrapper = shallow(<Icon color="accent">account_circle</Icon>);
      assert.strictEqual(
        wrapper.hasClass(classes.colorAccent),
        true,
        'should have the "accent" color',
      );
    });

    it('should render with the action color', () => {
      const wrapper = shallow(<Icon color="action">account_circle</Icon>);
      assert.strictEqual(
        wrapper.hasClass(classes.colorAction),
        true,
        'should have the "action" color',
      );
    });

    it('should render with the contrast color', () => {
      const wrapper = shallow(<Icon color="contrast">account_circle</Icon>);
      assert.strictEqual(
        wrapper.hasClass(classes.colorContrast),
        true,
        'should have the "contrast" color',
      );
    });

    it('should render with the error color', () => {
      const wrapper = shallow(<Icon color="error">account_circle</Icon>);
      assert.strictEqual(
        wrapper.hasClass(classes.colorError),
        true,
        'should have the "error" color',
      );
    });

    it('should render with the primary class', () => {
      const wrapper = shallow(<Icon color="primary">account_circle</Icon>);
      assert.strictEqual(
        wrapper.hasClass(classes.colorPrimary),
        true,
        'should have the "primary" color',
      );
    });
  });
});
