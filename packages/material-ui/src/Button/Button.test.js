import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  createShallow,
  createRender,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import Button from './Button';
import ButtonBase from '../ButtonBase';
import Icon from '../Icon';

describe('<Button />', () => {
  let mount;
  let shallow;
  let render;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    shallow = createShallow({ dive: true });
    render = createRender();
    classes = getClasses(<Button>Hello World</Button>);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Button>Conformance?</Button>, () => ({
    classes,
    inheritComponent: ButtonBase,
    mount,
    refInstanceof: window.HTMLButtonElement,
    skip: ['componentProp'],
  }));

  it('should render with the root & text classes but no others', () => {
    const wrapper = shallow(<Button>Hello World</Button>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.text), true);
    assert.strictEqual(wrapper.hasClass(classes.textPrimary), false);
    assert.strictEqual(wrapper.hasClass(classes.textSecondary), false);
    assert.strictEqual(wrapper.hasClass(classes.outlined), false);
    assert.strictEqual(wrapper.hasClass(classes.outlinedPrimary), false);
    assert.strictEqual(wrapper.hasClass(classes.outlinedSecondary), false);
    assert.strictEqual(wrapper.hasClass(classes.contained), false);
    assert.strictEqual(wrapper.hasClass(classes.containedPrimary), false);
    assert.strictEqual(wrapper.hasClass(classes.containedSecondary), false);
    assert.strictEqual(wrapper.hasClass(classes.sizeSmall), false);
    assert.strictEqual(wrapper.hasClass(classes.sizeLarge), false);
  });

  it('should render a text primary button', () => {
    const wrapper = shallow(<Button color="primary">Hello World</Button>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.contained), false);
    assert.strictEqual(wrapper.hasClass(classes.textPrimary), true);
    assert.strictEqual(wrapper.hasClass(classes.textSecondary), false);
  });

  it('should render a text secondary button', () => {
    const wrapper = shallow(<Button color="secondary">Hello World</Button>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.contained), false);
    assert.strictEqual(wrapper.hasClass(classes.textPrimary), false);
    assert.strictEqual(wrapper.hasClass(classes.textSecondary), true);
  });

  it('should render an outlined button', () => {
    const wrapper = shallow(<Button variant="outlined">Hello World</Button>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.outlined), true);
    assert.strictEqual(
      wrapper.hasClass(classes.contained),
      false,
      'should not have the contained class',
    );
    assert.strictEqual(wrapper.hasClass(classes.text), false);
  });

  it('should render a primary outlined button', () => {
    const wrapper = shallow(
      <Button variant="outlined" color="primary">
        Hello World
      </Button>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.outlined), true);
    assert.strictEqual(wrapper.hasClass(classes.outlinedPrimary), true);
    assert.strictEqual(wrapper.hasClass(classes.text), false);
    assert.strictEqual(wrapper.hasClass(classes.textPrimary), false);
    assert.strictEqual(wrapper.hasClass(classes.contained), false);
  });

  it('should render a secondary outlined button', () => {
    const wrapper = shallow(
      <Button variant="outlined" color="secondary">
        Hello World
      </Button>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.outlined), true);
    assert.strictEqual(wrapper.hasClass(classes.outlinedSecondary), true);
    assert.strictEqual(wrapper.hasClass(classes.text), false);
    assert.strictEqual(wrapper.hasClass(classes.textSecondary), false);
    assert.strictEqual(wrapper.hasClass(classes.contained), false);
  });

  it('should render an inherit outlined button', () => {
    const wrapper = shallow(
      <Button variant="outlined" color="inherit">
        Hello World
      </Button>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.outlined), true);
    assert.strictEqual(wrapper.hasClass(classes.colorInherit), true);
    assert.strictEqual(wrapper.hasClass(classes.text), false);
    assert.strictEqual(wrapper.hasClass(classes.textSecondary), false);
    assert.strictEqual(wrapper.hasClass(classes.contained), false);
  });

  it('should render a contained button', () => {
    const wrapper = shallow(<Button variant="contained">Hello World</Button>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.text), false);
    assert.strictEqual(wrapper.hasClass(classes.textPrimary), false);
    assert.strictEqual(wrapper.hasClass(classes.textSecondary), false);
    assert.strictEqual(wrapper.hasClass(classes.contained), true);
  });

  it('should render a contained primary button', () => {
    const wrapper = shallow(
      <Button variant="contained" color="primary">
        Hello World
      </Button>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.text), false);
    assert.strictEqual(wrapper.hasClass(classes.contained), true);
    assert.strictEqual(wrapper.hasClass(classes.containedPrimary), true);
    assert.strictEqual(wrapper.hasClass(classes.containedSecondary), false);
  });

  it('should render a contained secondary button', () => {
    const wrapper = shallow(
      <Button variant="contained" color="secondary">
        Hello World
      </Button>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.text), false);
    assert.strictEqual(wrapper.hasClass(classes.contained), true);
    assert.strictEqual(wrapper.hasClass(classes.containedPrimary), false);
    assert.strictEqual(wrapper.hasClass(classes.containedSecondary), true);
  });

  it('should render a small button', () => {
    const wrapper = shallow(<Button size="small">Hello World</Button>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.text), true);
    assert.strictEqual(wrapper.hasClass(classes.sizeSmall), true);
    assert.strictEqual(wrapper.hasClass(classes.sizeLarge), false);
  });

  it('should render a large button', () => {
    const wrapper = shallow(<Button size="large">Hello World</Button>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.text), true);
    assert.strictEqual(wrapper.hasClass(classes.sizeSmall), false);
    assert.strictEqual(wrapper.hasClass(classes.sizeLarge), true);
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
    const wrapper = shallow(<Button>{iconChild}</Button>);
    const label = wrapper.childAt(0);
    const renderedIconChild = label.childAt(0);
    assert.strictEqual(renderedIconChild.type(), Icon);
    assert.strictEqual(renderedIconChild.hasClass(childClassName), true);
  });

  describe('server-side', () => {
    // Only run the test on node.
    if (!/jsdom/.test(window.navigator.userAgent)) {
      return;
    }

    it('should server-side render', () => {
      const markup = render(<Button>Hello World</Button>);
      assert.strictEqual(markup.text(), 'Hello World');
    });
  });
});
