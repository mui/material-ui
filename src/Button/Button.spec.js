// @flow

import React from 'react';
import { assert } from 'chai';
import htmlLooksLike from 'html-looks-like';
import { createShallow, createRenderToString } from 'src/test-utils';
import Button, { styleSheet } from './Button';

describe('<Button />', () => {
  let shallow;
  let renderToString;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    renderToString = createRenderToString();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a <ButtonBase> element', () => {
    const wrapper = shallow(
      <Button>Hello World</Button>,
    );
    assert.strictEqual(wrapper.name(), 'ButtonBase');
    assert.strictEqual(wrapper.props().type, 'button',
      'should render with the button type attribute');
  });

  it('should render with the root class but no others', () => {
    const wrapper = shallow(
      <Button>Hello World</Button>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.raised), false, 'should not have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), false, 'should not have the fab class');
    assert.strictEqual(wrapper.hasClass(classes.primary), false,
      'should not have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.accent), false, 'should not have the accent class');
  });

  it('should render the custom className and the root class', () => {
    const wrapper = shallow(
      <Button className="test-class-name">Hello World</Button>,
    );
    assert.strictEqual(wrapper.is('.test-class-name'), true, 'should pass the test className');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should render a primary button', () => {
    const wrapper = shallow(
      <Button primary>Hello World</Button>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.raised), false, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), false, 'should not have the fab class');
    assert.strictEqual(wrapper.hasClass(classes.primary), true, 'should have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.accent), false, 'should not have the accent class');
  });

  it('should render an accent button', () => {
    const wrapper = shallow(
      <Button accent>Hello World</Button>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.raised), false, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), false, 'should not have the fab class');
    assert.strictEqual(wrapper.hasClass(classes.primary), false,
      'should not have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.accent), true, 'should not have the accent class');
  });

  it('should render a raised button', () => {
    const wrapper = shallow(
      <Button raised>Hello World</Button>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), false, 'should not have the fab class');
    assert.strictEqual(wrapper.hasClass(classes.primary), false,
      'should not have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.accent), false, 'should not have the accent class');
  });

  it('should render a raised primary button', () => {
    const wrapper = shallow(
      <Button raised primary>Hello World</Button>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), false, 'should not have the fab class');
    assert.strictEqual(wrapper.hasClass(classes.raisedPrimary), true,
      'should not have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.raisedAccent), false,
      'should not have the accent class');
  });

  it('should render a raised accent button', () => {
    const wrapper = shallow(
      <Button raised accent>Hello World</Button>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), false, 'should not have the fab class');
    assert.strictEqual(wrapper.hasClass(classes.raisedPrimary), false,
      'should not have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.raisedAccent), true,
      'should have the accent class');
  });

  it('should render a floating action button', () => {
    const wrapper = shallow(
      <Button fab>Hello World</Button>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), true, 'should have the fab class');
    assert.strictEqual(wrapper.hasClass(classes.primary), false,
      'should not have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.accent), false, 'should not have the accent class');
  });

  it('should render a primary floating action button', () => {
    const wrapper = shallow(
      <Button fab primary>Hello World</Button>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), true, 'should have the fab class');
    assert.strictEqual(wrapper.hasClass(classes.raisedPrimary), true,
      'should have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.raisedAccent), false,
      'should not have the accent class');
  });

  it('should render an accent floating action button', () => {
    const wrapper = shallow(
      <Button fab accent>Hello World</Button>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), true, 'should have the fab class');
    assert.strictEqual(wrapper.hasClass(classes.raisedPrimary), false,
      'should not have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.raisedAccent), true,
      'should have the accent class');
  });

  it('should have a ripple by default', () => {
    const wrapper = shallow(
      <Button>Hello World</Button>,
    );
    assert.strictEqual(wrapper.props().ripple, true, 'should set ripple to true');
  });

  it('should pass ripple={false} to ButtonBase', () => {
    const wrapper = shallow(
      <Button disableRipple>Hello World</Button>,
    );
    assert.strictEqual(wrapper.props().ripple, false, 'should set ripple to false');
  });

  it('should have a focusRipple by default', () => {
    const wrapper = shallow(
      <Button>Hello World</Button>,
    );
    assert.strictEqual(wrapper.props().focusRipple, true, 'should set focusRipple to true');
  });

  it('should pass ripple={false} to ButtonBase', () => {
    const wrapper = shallow(
      <Button disableFocusRipple>Hello World</Button>,
    );
    assert.strictEqual(wrapper.props().focusRipple, false, 'should set focusRipple to false');
  });

  describe('server side', () => {
    after(() => {
      renderToString.cleanUp();
    });

    it('should server side render', () => {
      // Only run the test on node.
      if (!/Node.js/.test(window.navigator.userAgent)) {
        return;
      }

      const markup = renderToString(<Button>Hello World</Button>);

      htmlLooksLike(markup, `
        <button
          tabindex="0"
          class="MuiButtonBase-buttonBase-3170508663 MuiButton-root-3593367901"
          type="button"
          data-reactroot=""
          data-reactid="1"
          data-react-checksum="-1899863948"
        >
          <span class="MuiButton-label-49836587" data-reactid="2">
            Hello World
          </span>
          <span class="MuiTouchRipple-root-3868442396" data-reactid="3"></span>
        </button>
      `);
    });
  });
});
