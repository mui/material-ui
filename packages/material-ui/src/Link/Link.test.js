import React from 'react';
import { assert } from 'chai';
import { createShallow, createRender, getClasses } from '@material-ui/core/test-utils';
import Link from './Link';
import ButtonBase from '../ButtonBase';

describe('<Link />', () => {
  let shallow;
  let render;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    render = createRender();
    classes = getClasses(<Link href="/">Home</Link>);
  });

  it('should render a <ButtonBase> element', () => {
    const wrapper = shallow(<Link href="/">Home</Link>);
    assert.strictEqual(wrapper.type(), ButtonBase);
  });

  it('should render with the root class but no others', () => {
    const wrapper = shallow(<Link href="/">Home</Link>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.primary), false);
    assert.strictEqual(wrapper.hasClass(classes.secondary), false);
    assert.strictEqual(wrapper.hasClass(classes.colorInherit), false);
    assert.strictEqual(wrapper.hasClass(classes.disabled), false);
    assert.strictEqual(wrapper.hasClass(classes.sizeLarge), false);
    assert.strictEqual(wrapper.hasClass(classes.sizeSmall), false);
  });

  it('should render the custom className and the root class', () => {
    const wrapper = shallow(
      <Link href="/" className="test-class-name">
        Home
      </Link>,
    );
    assert.strictEqual(wrapper.is('.test-class-name'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render a primary link', () => {
    const wrapper = shallow(
      <Link href="/" color="primary">
        Home
      </Link>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.primary), true);
    assert.strictEqual(wrapper.hasClass(classes.secondary), false);
    assert.strictEqual(wrapper.hasClass(classes.colorInherit), false);
  });

  it('should render a secondary link', () => {
    const wrapper = shallow(
      <Link href="/" color="secondary">
        Home
      </Link>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.primary), false);
    assert.strictEqual(wrapper.hasClass(classes.secondary), true);
    assert.strictEqual(wrapper.hasClass(classes.colorInherit), false);
  });

  it('should render a small link', () => {
    const wrapper = shallow(
      <Link href="/" size="small">
        Home
      </Link>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.sizeSmall), true);
    assert.strictEqual(wrapper.hasClass(classes.sizeLarge), false);
  });

  it('should render a large button', () => {
    const wrapper = shallow(
      <Link href="/" size="large">
        Home
      </Link>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.sizeSmall), false);
    assert.strictEqual(wrapper.hasClass(classes.sizeLarge), true);
  });

  it('should have a ripple by default', () => {
    const wrapper = shallow(<Link href="/">Home</Link>);
    assert.strictEqual(wrapper.props().disableRipple, undefined);
  });

  it('should pass disableRipple to ButtonBase', () => {
    const wrapper = shallow(
      <Link href="/" disableRipple>
        Home
      </Link>,
    );
    assert.strictEqual(wrapper.props().disableRipple, true);
  });

  it('should have a focusRipple by default', () => {
    const wrapper = shallow(<Link href="/">Home</Link>);
    assert.strictEqual(wrapper.props().focusRipple, true);
  });

  it('should pass disableFocusRipple to ButtonBase', () => {
    const wrapper = shallow(
      <Link href="/" disableFocusRipple>
        Home
      </Link>,
    );
    assert.strictEqual(wrapper.props().focusRipple, false);
  });

  describe('server-side', () => {
    // Only run the test on node.
    if (!/jsdom/.test(window.navigator.userAgent)) {
      return;
    }

    it('should server-side render', () => {
      const markup = render(<Link href="/">Home</Link>);
      assert.strictEqual(markup.text(), 'Home');
    });
  });
});
