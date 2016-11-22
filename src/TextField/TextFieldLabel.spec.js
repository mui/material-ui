// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createMountWithContext } from 'test/utils';
import TextFieldLabel, { styleSheet } from './TextFieldLabel';

describe('<TextFieldLabel />', () => {
  let mount;
  let classes;

  before(() => {
    mount = createMountWithContext();
    classes = mount.context.styleManager.render(styleSheet);
  });

  it('should animate by default', () => {
    const wrapper = mount(<TextFieldLabel />);
    assert.strictEqual(wrapper.hasClass(classes.animated), true, 'should have the animated class');
  });

  it('should not animate', () => {
    const wrapper = mount(<TextFieldLabel animated={false} />);
    assert.strictEqual(wrapper.hasClass(classes.animated), false, 'should not have the animated class');
  });

  it('should not shrink by default', () => {
    const wrapper = mount(<TextFieldLabel />);
    assert.strictEqual(wrapper.hasClass(classes.shrink), false, 'should not have the shrink class');
  });

  it('should shrink', () => {
    const wrapper = mount(<TextFieldLabel shrink />);
    assert.strictEqual(wrapper.hasClass(classes.shrink), true, 'should have the shrink class');
  });
});
