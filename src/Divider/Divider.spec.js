// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Divider, { styleSheet } from './Divider';

describe('<Divider />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(styleSheet);
  });

  it('should render a hr', () => {
    const wrapper = shallow(<Divider />);
    assert.strictEqual(wrapper.name(), 'hr');
  });

  it('should render with the root and default class', () => {
    const wrapper = shallow(<Divider />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.default), true, 'should have the default class');
  });

  it('should set the absolute class', () => {
    const wrapper = shallow(<Divider absolute />);
    assert.strictEqual(wrapper.hasClass(classes.absolute), true, 'should be absolute');
  });

  it('should set the inset class', () => {
    const wrapper = shallow(<Divider inset />);
    assert.strictEqual(wrapper.hasClass(classes.inset), true, 'should have inset cass');
  });

  it('should set the light class', () => {
    const wrapper = shallow(<Divider light />);
    assert.strictEqual(wrapper.hasClass(classes.light), true, 'should have light class');
  });
});
