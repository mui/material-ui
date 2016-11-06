// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import Button, { styleSheet } from './Button';

describe('<Button>', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a <ButtonBase> element', () => {
    const wrapper = shallow(
      <Button>Hello World</Button>
    );
    assert.strictEqual(wrapper.is('ButtonBase'), true, 'should be a <button>');
    assert.strictEqual(wrapper.prop('type'), 'button', 'should render with the button type attribute');
  });

  it('should render with the root class but no others', () => {
    const wrapper = shallow(
      <Button>Hello World</Button>
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.raised), false, 'should not have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), false, 'should not have the fab class');
    assert.strictEqual(wrapper.hasClass(classes.primary), false, 'should not have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.accent), false, 'should not have the accent class');
  });

  it('should render the custom className and the root class', () => {
    const wrapper = shallow(
      <Button className="test-class-name" />
    );
    assert.strictEqual(wrapper.is('.test-class-name'), true, 'should pass the test className');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should render a primary button', () => {
    const wrapper = shallow(
      <Button primary>Hello World</Button>
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.raised), false, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), false, 'should not have the fab class');
    assert.strictEqual(wrapper.hasClass(classes.primary), true, 'should have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.accent), false, 'should not have the accent class');
  });

  it('should render an accent button', () => {
    const wrapper = shallow(
      <Button accent>Hello World</Button>
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.raised), false, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), false, 'should not have the fab class');
    assert.strictEqual(wrapper.hasClass(classes.primary), false, 'should not have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.accent), true, 'should not have the accent class');
  });

  it('should render a raised button', () => {
    const wrapper = shallow(
      <Button raised>Hello World</Button>
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), false, 'should not have the fab class');
    assert.strictEqual(wrapper.hasClass(classes.primary), false, 'should not have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.accent), false, 'should not have the accent class');
  });

  it('should render a raised primary button', () => {
    const wrapper = shallow(
      <Button raised primary>Hello World</Button>
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), false, 'should not have the fab class');
    assert.strictEqual(wrapper.hasClass(classes.raisedPrimary), true, 'should not have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.raisedAccent), false, 'should not have the accent class');
  });

  it('should render a raised accent button', () => {
    const wrapper = shallow(
      <Button raised accent>Hello World</Button>
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), false, 'should not have the fab class');
    assert.strictEqual(wrapper.hasClass(classes.raisedPrimary), false, 'should not have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.raisedAccent), true, 'should have the accent class');
  });

  it('should render a floating action button', () => {
    const wrapper = shallow(
      <Button fab />
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), true, 'should have the fab class');
    assert.strictEqual(wrapper.hasClass(classes.primary), false, 'should not have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.accent), false, 'should not have the accent class');
  });

  it('should render a primary floating action button', () => {
    const wrapper = shallow(
      <Button fab primary />
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), true, 'should have the fab class');
    assert.strictEqual(wrapper.hasClass(classes.raisedPrimary), true, 'should have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.raisedAccent), false, 'should not have the accent class');
  });

  it('should render an accent floating action button', () => {
    const wrapper = shallow(
      <Button fab accent />
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), true, 'should have the fab class');
    assert.strictEqual(wrapper.hasClass(classes.raisedPrimary), false, 'should not have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.raisedAccent), true, 'should have the accent class');
  });
});
