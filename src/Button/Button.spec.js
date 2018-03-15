import React from 'react';
import { assert } from 'chai';
import { createShallow, createRender, getClasses } from '../test-utils';
import Button from './Button';
import ButtonBase from '../ButtonBase';
import Icon from '../Icon';

describe('<Button />', () => {
  let shallow;
  let render;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    render = createRender();
    classes = getClasses(<Button>Hello World</Button>);
  });

  it('should render a <ButtonBase> element', () => {
    const wrapper = shallow(<Button>Hello World</Button>);
    assert.strictEqual(wrapper.type(), ButtonBase);
    assert.strictEqual(
      wrapper.props().type,
      'button',
      'should render with the button type attribute',
    );
  });

  it('should render with the root class but no others', () => {
    const wrapper = shallow(<Button>Hello World</Button>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.raised), false, 'should not have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), false, 'should not have the fab class');
    assert.strictEqual(
      wrapper.hasClass(classes.flatPrimary),
      false,
      'should not have the primary class',
    );
    assert.strictEqual(wrapper.hasClass(classes.flatSecondary), false);
  });

  it('should render the custom className and the root class', () => {
    const wrapper = shallow(<Button className="test-class-name">Hello World</Button>);
    assert.strictEqual(wrapper.is('.test-class-name'), true, 'should pass the test className');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render a primary button', () => {
    const wrapper = shallow(<Button color="primary">Hello World</Button>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.raised), false, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), false, 'should not have the fab class');
    assert.strictEqual(
      wrapper.hasClass(classes.flatPrimary),
      true,
      'should have the primary class',
    );
    assert.strictEqual(wrapper.hasClass(classes.flatSecondary), false);
  });

  it('should render an secondary button', () => {
    const wrapper = shallow(<Button color="secondary">Hello World</Button>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.raised), false, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), false, 'should not have the fab class');
    assert.strictEqual(
      wrapper.hasClass(classes.flatPrimary),
      false,
      'should not have the primary class',
    );
    assert.strictEqual(wrapper.hasClass(classes.flatSecondary), true);
  });

  it('should render a raised button', () => {
    const wrapper = shallow(<Button variant="raised">Hello World</Button>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), false, 'should not have the fab class');
    assert.strictEqual(
      wrapper.hasClass(classes.flatPrimary),
      false,
      'should not have the primary class',
    );
    assert.strictEqual(wrapper.hasClass(classes.flatSecondary), false);
  });

  it('should render a raised primary button', () => {
    const wrapper = shallow(
      <Button variant="raised" color="primary">
        Hello World
      </Button>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), false, 'should not have the fab class');
    assert.strictEqual(
      wrapper.hasClass(classes.raisedPrimary),
      true,
      'should not have the primary class',
    );
    assert.strictEqual(wrapper.hasClass(classes.raisedSecondary), false);
  });

  it('should render a raised secondary button', () => {
    const wrapper = shallow(
      <Button variant="raised" color="secondary">
        Hello World
      </Button>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), false, 'should not have the fab class');
    assert.strictEqual(
      wrapper.hasClass(classes.raisedPrimary),
      false,
      'should not have the primary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.raisedSecondary),
      true,
      'should have the secondary class',
    );
  });

  it('should render a floating action button', () => {
    const wrapper = shallow(<Button variant="fab">Hello World</Button>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), true, 'should have the fab class');
    assert.strictEqual(
      wrapper.hasClass(classes.flatPrimary),
      false,
      'should not have the primary class',
    );
    assert.strictEqual(wrapper.hasClass(classes.flatSecondary), false);
  });

  it('should render a mini floating action button', () => {
    const wrapper = shallow(
      <Button variant="fab" mini>
        Hello World
      </Button>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), true, 'should have the fab class');
    assert.strictEqual(wrapper.hasClass(classes.mini), true, 'should have the mini class');
    assert.strictEqual(
      wrapper.hasClass(classes.flatPrimary),
      false,
      'should not have the primary class',
    );
    assert.strictEqual(wrapper.hasClass(classes.flatSecondary), false);
  });

  it('should render a primary floating action button', () => {
    const wrapper = shallow(
      <Button variant="fab" color="primary">
        Hello World
      </Button>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), true, 'should have the fab class');
    assert.strictEqual(
      wrapper.hasClass(classes.raisedPrimary),
      true,
      'should have the primary class',
    );
    assert.strictEqual(wrapper.hasClass(classes.raisedSecondary), false);
  });

  it('should render an secondary floating action button', () => {
    const wrapper = shallow(
      <Button variant="fab" color="secondary">
        Hello World
      </Button>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), true, 'should have the fab class');
    assert.strictEqual(
      wrapper.hasClass(classes.raisedPrimary),
      false,
      'should not have the primary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.raisedSecondary),
      true,
      'should have the secondary class',
    );
  });

  it('should have a ripple by default', () => {
    const wrapper = shallow(<Button>Hello World</Button>);
    assert.strictEqual(wrapper.props().disableRipple, undefined);
  });

  it('should pass disableRipple to ButtonBase', () => {
    const wrapper = shallow(<Button disableRipple>Hello World</Button>);
    assert.strictEqual(wrapper.props().disableRipple, true);
  });

  it('should have a focusRipple by default', () => {
    const wrapper = shallow(<Button>Hello World</Button>);
    assert.strictEqual(wrapper.props().focusRipple, true, 'should set focusRipple to true');
  });

  it('should pass disableFocusRipple to ButtonBase', () => {
    const wrapper = shallow(<Button disableFocusRipple>Hello World</Button>);
    assert.strictEqual(wrapper.props().focusRipple, false, 'should set focusRipple to false');
  });

  it('should render Icon children with right classes', () => {
    const childClassName = 'child-woof';
    const iconChild = <Icon className={childClassName} />;
    const wrapper = shallow(<Button variant="fab">{iconChild}</Button>);
    const label = wrapper.childAt(0);
    const renderedIconChild = label.childAt(0);
    assert.strictEqual(renderedIconChild.type(), Icon);
    assert.strictEqual(renderedIconChild.hasClass(childClassName), true, 'child should be icon');
  });

  describe('server side', () => {
    // Only run the test on node.
    if (!/jsdom/.test(window.navigator.userAgent)) {
      return;
    }

    it('should server side render', () => {
      const markup = render(<Button>Hello World</Button>);
      assert.strictEqual(markup.text(), 'Hello World');
    });
  });
});
