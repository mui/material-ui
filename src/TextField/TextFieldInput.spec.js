/* eslint-env mocha */
import React from 'react';
import {assert} from 'chai';
import TextFieldInput, {styleSheet} from './TextFieldInput';
import {createShallowWithContext} from 'test/utils';

describe('<TextFieldInput>', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet, {group: 'mui'});
  });

  it('should render an <input> element with the root class', () => {
    const wrapper = shallow(<TextFieldInput />);
    assert.strictEqual(wrapper.is('input'), true, 'should be a <input>');
    assert.strictEqual(wrapper.prop('type'), 'text', 'should pass the text type prop');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
});
