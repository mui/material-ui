import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  createShallow,
  createRender,
  describeConformance,
  getClasses,
} from '../test-utils';
import Fab from './Fab';
import ButtonBase from '../ButtonBase';
import Icon from '../Icon';

describe('<Fab />', () => {
  let mount;
  let shallow;
  let render;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    shallow = createShallow({ dive: true });
    render = createRender();
    classes = getClasses(<Fab>Fab</Fab>);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Fab>Conformance?</Fab>, () => ({
    classes,
    inheritComponent: ButtonBase,
    mount,
    refInstanceof: window.HTMLButtonElement,
    skip: ['componentProp'],
  }));

  it('should render with the root class but no others', () => {
    const wrapper = shallow(<Fab>Fab</Fab>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.primary), false);
    assert.strictEqual(wrapper.hasClass(classes.secondary), false);
    assert.strictEqual(wrapper.hasClass(classes.extended), false);
    assert.strictEqual(wrapper.hasClass(classes.focusVisible), false);
    assert.strictEqual(wrapper.hasClass(classes.disabled), false);
    assert.strictEqual(wrapper.hasClass(classes.colorInherit), false);
    assert.strictEqual(wrapper.hasClass(classes.mini), false);
    assert.strictEqual(wrapper.hasClass(classes.fullWidth), false);
    assert.strictEqual(wrapper.hasClass(classes.sizeSmall), false);
    assert.strictEqual(wrapper.hasClass(classes.sizeMedium), false);
  });

  it('should render an extended floating action button', () => {
    const wrapper = shallow(<Fab variant="extended">Fab</Fab>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.extended), true);
  });

  it('should render a primary floating action button', () => {
    const wrapper = shallow(<Fab color="primary">Fab</Fab>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.primary), true);
    assert.strictEqual(wrapper.hasClass(classes.secondary), false);
  });

  it('should render a secondary floating action button', () => {
    const wrapper = shallow(<Fab color="secondary">Fab</Fab>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.primary), false);
    assert.strictEqual(wrapper.hasClass(classes.secondary), true);
  });

  it('should render a small floating action button', () => {
    const wrapper = shallow(<Fab size="small">Fab</Fab>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.sizeSmall), true);
    assert.strictEqual(wrapper.hasClass(classes.sizeMedium), false);
  });

  it('should render a medium floating action button', () => {
    const wrapper = shallow(<Fab size="medium">Fab</Fab>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.sizeSmall), false);
    assert.strictEqual(wrapper.hasClass(classes.sizeMedium), true);
  });

  it('should have a ripple by default', () => {
    const wrapper = shallow(<Fab>Fab</Fab>);
    assert.strictEqual(wrapper.props().disableRipple, undefined);
  });

  it('should pass disableRipple to ButtonBase', () => {
    const wrapper = shallow(<Fab disableRipple>Fab</Fab>);
    assert.strictEqual(wrapper.props().disableRipple, true);
  });

  it('should have a focusRipple by default', () => {
    const wrapper = shallow(<Fab>Fab</Fab>);
    assert.strictEqual(wrapper.props().focusRipple, true);
  });

  it('should pass disableFocusRipple to ButtonBase', () => {
    const wrapper = shallow(<Fab disableFocusRipple>Fab</Fab>);
    assert.strictEqual(wrapper.props().focusRipple, false);
  });

  it('should render Icon children with right classes', () => {
    const childClassName = 'child-woof';
    const iconChild = <Icon className={childClassName} />;
    const wrapper = shallow(<Fab>{iconChild}</Fab>);
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
      const markup = render(<Fab>Fab</Fab>);
      assert.strictEqual(markup.text(), 'Fab');
    });
  });
});
