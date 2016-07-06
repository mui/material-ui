/* eslint-env mocha */
import React from 'react';
import {assert} from 'chai';
import TextField, {styleSheet} from './TextField';
import {createShallowWithContext} from 'test/utils';

describe('<TextField>', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet, {group: 'mui'});
  });

  it('should render an <Input> element', () => {
    const wrapper = shallow(
      <TextField>Hello World</TextField>
    );

    assert.strictEqual(wrapper.is('Input'), true, 'should be a <Input>');
    assert.strictEqual(wrapper.prop('component'), 'input', 'should pass \'input\' as the component prop');
    assert.strictEqual(wrapper.prop('type'), 'text', 'should pass the text type prop');
  });
});
