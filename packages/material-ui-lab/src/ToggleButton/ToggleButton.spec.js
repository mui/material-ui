import React from 'react';
import { assert } from 'chai';
import { createShallow, createRender, getClasses } from '../test-utils';
import ToggleButton from './ToggleButton';
import ButtonBase from '../ButtonBase';

describe('<ToggleButton />', () => {
  let shallow;
  let render;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    render = createRender();
    classes = getClasses(<ToggleButton>Hello World</ToggleButton>);
  });

  it('should render a <ButtonBase> element', () => {
    const wrapper = shallow(<ToggleButton>Hello World</ToggleButton>);
    assert.strictEqual(wrapper.type(), ButtonBase);
    assert.strictEqual(
      wrapper.props().type,
      'button',
      'should render with the button type attribute',
    );
  });

  it('should render the custom className and the root class', () => {
    const wrapper = shallow(<ToggleButton className="test-class-name">Hello World</ToggleButton>);
    assert.strictEqual(wrapper.is('.test-class-name'), true, 'should pass the test className');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render a selected button', () => {
    const wrapper = shallow(<ToggleButton selected>Hello World</ToggleButton>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.selected), true, 'should have the selected class');
  });

  it('should have a ripple by default', () => {
    const wrapper = shallow(<ToggleButton>Hello World</ToggleButton>);
    assert.strictEqual(wrapper.props().disableRipple, false);
  });

  it('should pass disableRipple to ButtonBase', () => {
    const wrapper = shallow(<ToggleButton disableRipple>Hello World</ToggleButton>);
    assert.strictEqual(wrapper.props().disableRipple, true);
  });

  it('should have a focusRipple by default', () => {
    const wrapper = shallow(<ToggleButton>Hello World</ToggleButton>);
    assert.strictEqual(wrapper.props().focusRipple, true, 'should set focusRipple to true');
  });

  it('should pass disableFocusRipple to ButtonBase', () => {
    const wrapper = shallow(<ToggleButton disableFocusRipple>Hello World</ToggleButton>);
    assert.strictEqual(wrapper.props().focusRipple, false, 'should set focusRipple to false');
  });

  describe('server side', () => {
    // Only run the test on node.
    if (!/jsdom/.test(window.navigator.userAgent)) {
      return;
    }

    it('should server side render', () => {
      const markup = render(<ToggleButton>Hello World</ToggleButton>);
      assert.strictEqual(markup.text(), 'Hello World');
    });
  });
});
