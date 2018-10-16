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
    assert.strictEqual(wrapper.contains('account_circle'), true);
  });

  it('should render an span with root class', () => {
    const wrapper = shallow(<Icon>account_circle</Icon>);
    assert.strictEqual(wrapper.name(), 'span');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should spread props on span', () => {
    const wrapper = shallow(<Icon data-test="hello">account_circle</Icon>);
    assert.strictEqual(wrapper.props()['data-test'], 'hello');
  });

  describe('optional classes', () => {
    it('should render with the user class', () => {
      const wrapper = shallow(<Icon className="meow">account_circle</Icon>);
      assert.strictEqual(wrapper.hasClass('meow'), true);
    });

    it('should render with the secondary color', () => {
      const wrapper = shallow(<Icon color="secondary">account_circle</Icon>);
      assert.strictEqual(wrapper.hasClass(classes.colorSecondary), true);
    });

    it('should render with the action color', () => {
      const wrapper = shallow(<Icon color="action">account_circle</Icon>);
      assert.strictEqual(wrapper.hasClass(classes.colorAction), true);
    });

    it('should render with the error color', () => {
      const wrapper = shallow(<Icon color="error">account_circle</Icon>);
      assert.strictEqual(wrapper.hasClass(classes.colorError), true);
    });

    it('should render with the primary class', () => {
      const wrapper = shallow(<Icon color="primary">account_circle</Icon>);
      assert.strictEqual(wrapper.hasClass(classes.colorPrimary), true);
    });
  });

  describe('prop: fontSize', () => {
    it('should be able to change the fontSize', () => {
      const wrapper = shallow(<Icon fontSize="inherit">account_circle</Icon>);
      assert.strictEqual(wrapper.hasClass(classes.fontSizeInherit), true);
    });
  });
});
