/* eslint-env mocha */
import React from 'react';
import {assert} from 'chai';
import Input, {styleSheet} from './Input';
import {createShallowWithContext} from 'test/utils';

describe('<Input>', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet, {group: 'mui'});
  });

  it('should render an <input> element with the root class', () => {
    const wrapper = shallow(<Input />);
    assert.strictEqual(wrapper.is('input'), true, 'should be a <input>');
    assert.strictEqual(wrapper.prop('type'), 'text', 'should pass the text type prop');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
});
