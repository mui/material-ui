// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from 'src/test-utils';
import TextFieldLabel, { styleSheet } from './TextFieldLabel';

describe('<TextFieldLabel />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a FormLabel', () => {
    const wrapper = shallow(<TextFieldLabel />);
    assert.strictEqual(wrapper.name(), 'FormLabel');
  });

  it('should animate by default', () => {
    const wrapper = shallow(<TextFieldLabel />);
    assert.strictEqual(wrapper.hasClass(classes.animated), true, 'should have the animated class');
  });

  it('should not animate', () => {
    const wrapper = shallow(<TextFieldLabel disableAnimation />);
    assert.strictEqual(wrapper.hasClass(classes.animated), false,
      'should not have the animated class');
  });

  it('should not shrink by default', () => {
    const wrapper = shallow(<TextFieldLabel />);
    assert.strictEqual(wrapper.hasClass(classes.shrink), false, 'should not have the shrink class');
  });

  it('should shrink', () => {
    const wrapper = shallow(<TextFieldLabel shrink />);
    assert.strictEqual(wrapper.hasClass(classes.shrink), true, 'should have the shrink class');
  });
});
