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

  it('should render with the root & flat classes but no others', () => {
    const wrapper = shallow(<Button>Hello World</Button>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.flat), true);
    assert.strictEqual(wrapper.hasClass(classes.fab), false);
    assert.strictEqual(
      wrapper.hasClass(classes.textPrimary),
      false,
      'should not have the textPrimary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.textSecondary),
      false,
      'should not have the textSecondary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.flatPrimary),
      false,
      'should not have the flatPrimary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.flatSecondary),
      false,
      'should not have the flatSecondary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.contained),
      false,
      'should not have the contained class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.containedPrimary),
      false,
      'should not have the containedPrimary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.containedSecondary),
      false,
      'should not have the containedSecondary class',
    );
    assert.strictEqual(wrapper.hasClass(classes.raised), false);
    assert.strictEqual(
      wrapper.hasClass(classes.raisedPrimary),
      false,
      'should not have the raisedPrimary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.outlined),
      false,
      'should not have the outlined class',
    );
  });

  it('should render the custom className and the root class', () => {
    const wrapper = shallow(<Button className="test-class-name">Hello World</Button>);
    assert.strictEqual(wrapper.is('.test-class-name'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render a primary button', () => {
    const wrapper = shallow(<Button color="primary">Hello World</Button>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.flat), true);
    assert.strictEqual(wrapper.hasClass(classes.contained), false);
    assert.strictEqual(wrapper.hasClass(classes.fab), false);
    assert.strictEqual(
      wrapper.hasClass(classes.textPrimary),
      true,
      'should have the textPrimary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.textSecondary),
      false,
      'should not have the textSecondary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.flatPrimary),
      true,
      'should have the flatPrimary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.flatSecondary),
      false,
      'should not have the flatSecondary class',
    );
  });

  it('should render a secondary button', () => {
    const wrapper = shallow(<Button color="secondary">Hello World</Button>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.flat), true);
    assert.strictEqual(wrapper.hasClass(classes.contained), false);
    assert.strictEqual(wrapper.hasClass(classes.fab), false);
    assert.strictEqual(
      wrapper.hasClass(classes.textPrimary),
      false,
      'should not have the textPrimary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.textSecondary),
      true,
      'should have the textSecondary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.flatPrimary),
      false,
      'should not have the flatPrimary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.flatSecondary),
      true,
      'should have the flatSecondary class',
    );
  });

  it('should render a contained button', () => {
    const wrapper = shallow(<Button variant="contained">Hello World</Button>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(
      wrapper.hasClass(classes.contained),
      true,
      'should have the contained class',
    );
    assert.strictEqual(wrapper.hasClass(classes.fab), false);
    assert.strictEqual(
      wrapper.hasClass(classes.textPrimary),
      false,
      'should not have the textPrimary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.textSecondary),
      false,
      'should not have the textSecondary class',
    );
  });

  it('should render a contained primary button', () => {
    const wrapper = shallow(
      <Button variant="contained" color="primary">
        Hello World
      </Button>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(
      wrapper.hasClass(classes.contained),
      true,
      'should have the contained class',
    );
    assert.strictEqual(wrapper.hasClass(classes.fab), false);
    assert.strictEqual(
      wrapper.hasClass(classes.containedPrimary),
      true,
      'should have the containdPrimary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.containedSecondary),
      false,
      'should not have the containedSecondary class',
    );
  });

  it('should render a contained secondary button', () => {
    const wrapper = shallow(
      <Button variant="contained" color="secondary">
        Hello World
      </Button>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.contained), true);
    assert.strictEqual(wrapper.hasClass(classes.fab), false);
    assert.strictEqual(
      wrapper.hasClass(classes.containedPrimary),
      false,
      'should not have the primary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.containedSecondary),
      true,
      'should have the secondary class',
    );
  });

  it('should render a raised button', () => {
    const wrapper = shallow(<Button variant="raised">Hello World</Button>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(
      wrapper.hasClass(classes.contained),
      true,
      'should have the contained class',
    );
    assert.strictEqual(wrapper.hasClass(classes.raised), true);
    assert.strictEqual(wrapper.hasClass(classes.fab), false);
    assert.strictEqual(
      wrapper.hasClass(classes.containedPrimary),
      false,
      'should not have the containedPrimary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.raisedPrimary),
      false,
      'should not have the raisedPrimary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.containedSecondary),
      false,
      'should not have the containedSecondary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.raisedSecondary),
      false,
      'should not have the raisedSecondary class',
    );
  });

  it('should render a raised primary button', () => {
    const wrapper = shallow(
      <Button variant="raised" color="primary">
        Hello World
      </Button>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(
      wrapper.hasClass(classes.contained),
      true,
      'should have the contained class',
    );
    assert.strictEqual(wrapper.hasClass(classes.raised), true);
    assert.strictEqual(wrapper.hasClass(classes.fab), false);
    assert.strictEqual(
      wrapper.hasClass(classes.containedPrimary),
      true,
      'should have the containedPrimary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.raisedPrimary),
      true,
      'should have the raisedPrimary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.containedSecondary),
      false,
      'should not have the containedSecondary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.raisedSecondary),
      false,
      'should not have the raisedSecondary class',
    );
  });

  it('should render a raised secondary button', () => {
    const wrapper = shallow(
      <Button variant="raised" color="secondary">
        Hello World
      </Button>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(
      wrapper.hasClass(classes.contained),
      true,
      'should have the contained class',
    );
    assert.strictEqual(wrapper.hasClass(classes.raised), true);
    assert.strictEqual(wrapper.hasClass(classes.fab), false);
    assert.strictEqual(
      wrapper.hasClass(classes.containedPrimary),
      false,
      'should not have the containedPrimary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.raisedPrimary),
      false,
      'should not have the raisedPrimary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.containedSecondary),
      true,
      'should have the containedSecondary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.raisedSecondary),
      true,
      'should have the raisedSecondary class',
    );
  });

  it('should render an outlined button', () => {
    const wrapper = shallow(<Button variant="outlined">Hello World</Button>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.text), true);
    assert.strictEqual(wrapper.hasClass(classes.outlined), true);
    assert.strictEqual(
      wrapper.hasClass(classes.contained),
      false,
      'should not have the contained class',
    );
    assert.strictEqual(wrapper.hasClass(classes.raised), false);
    assert.strictEqual(wrapper.hasClass(classes.fab), false);
  });

  it('should render a primary outlined button', () => {
    const wrapper = shallow(
      <Button variant="outlined" color="primary">
        Hello World
      </Button>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.text), true);
    assert.strictEqual(wrapper.hasClass(classes.outlined), true);
    assert.strictEqual(
      wrapper.hasClass(classes.textPrimary),
      true,
      'should have the textPrimary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.contained),
      false,
      'should not have the contained class',
    );
    assert.strictEqual(wrapper.hasClass(classes.raised), false);
    assert.strictEqual(wrapper.hasClass(classes.fab), false);
  });

  it('should render a secondary outlined button', () => {
    const wrapper = shallow(
      <Button variant="outlined" color="secondary">
        Hello World
      </Button>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.text), true);
    assert.strictEqual(wrapper.hasClass(classes.outlined), true);
    assert.strictEqual(
      wrapper.hasClass(classes.textSecondary),
      true,
      'should have the textSecondary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.contained),
      false,
      'should not have the contained class',
    );
    assert.strictEqual(wrapper.hasClass(classes.raised), false);
    assert.strictEqual(wrapper.hasClass(classes.fab), false);
  });

  it('should render a floating action button', () => {
    const wrapper = shallow(<Button variant="fab">Hello World</Button>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(
      wrapper.hasClass(classes.contained),
      true,
      'should have the contained class',
    );
    assert.strictEqual(wrapper.hasClass(classes.fab), true);
    assert.strictEqual(
      wrapper.hasClass(classes.extendedFab),
      false,
      'should not have the extendedFab class',
    );
    assert.strictEqual(wrapper.hasClass(classes.flat), false);
    assert.strictEqual(
      wrapper.hasClass(classes.textPrimary),
      false,
      'should not have the textPrimary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.textSecondary),
      false,
      'should not have the textSecondary class',
    );
  });

  it('should render an extended floating action button', () => {
    const wrapper = shallow(<Button variant="extendedFab">Hello World</Button>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(
      wrapper.hasClass(classes.contained),
      true,
      'should have the contained class',
    );
    assert.strictEqual(wrapper.hasClass(classes.fab), true);
    assert.strictEqual(
      wrapper.hasClass(classes.extendedFab),
      true,
      'should have the extendedFab class',
    );
    assert.strictEqual(wrapper.hasClass(classes.flat), false);
    assert.strictEqual(
      wrapper.hasClass(classes.textPrimary),
      false,
      'should not have the textPrimary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.textSecondary),
      false,
      'should not have the textSecondary class',
    );
  });

  it('should render a mini floating action button', () => {
    const wrapper = shallow(
      <Button variant="fab" mini>
        Hello World
      </Button>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.contained), true);
    assert.strictEqual(wrapper.hasClass(classes.fab), true);
    assert.strictEqual(wrapper.hasClass(classes.mini), true);
    assert.strictEqual(
      wrapper.hasClass(classes.textPrimary),
      false,
      'should not have the textPrimary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.textSecondary),
      false,
      'should not have the textSecondary class',
    );
  });

  it('should render a primary floating action button', () => {
    const wrapper = shallow(
      <Button variant="fab" color="primary">
        Hello World
      </Button>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.contained), true);
    assert.strictEqual(wrapper.hasClass(classes.fab), true);
    assert.strictEqual(
      wrapper.hasClass(classes.containedPrimary),
      true,
      'should have the containedPrimary class',
    );
    assert.strictEqual(wrapper.hasClass(classes.containedSecondary), false);
  });

  it('should render an secondary floating action button', () => {
    const wrapper = shallow(
      <Button variant="fab" color="secondary">
        Hello World
      </Button>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.contained), true);
    assert.strictEqual(wrapper.hasClass(classes.fab), true);
    assert.strictEqual(wrapper.hasClass(classes.containedPrimary), false);
    assert.strictEqual(wrapper.hasClass(classes.containedSecondary), true);
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
    assert.strictEqual(wrapper.props().focusRipple, true);
  });

  it('should pass disableFocusRipple to ButtonBase', () => {
    const wrapper = shallow(<Button disableFocusRipple>Hello World</Button>);
    assert.strictEqual(wrapper.props().focusRipple, false);
  });

  it('should render Icon children with right classes', () => {
    const childClassName = 'child-woof';
    const iconChild = <Icon className={childClassName} />;
    const wrapper = shallow(<Button variant="fab">{iconChild}</Button>);
    const label = wrapper.childAt(0);
    const renderedIconChild = label.childAt(0);
    assert.strictEqual(renderedIconChild.type(), Icon);
    assert.strictEqual(renderedIconChild.hasClass(childClassName), true);
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
