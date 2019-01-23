import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createRender, createShallow, getClasses } from '@material-ui/core/test-utils';
import ButtonBase from '@material-ui/core/ButtonBase';
import Icon from '@material-ui/core/Icon';
import Breadcrumb from './Breadcrumb';

describe('<Breadcrumb />', () => {
  let shallow;
  let render;
  let classes;
  const icon = <Icon>font_icon</Icon>;

  before(() => {
    shallow = createShallow({ dive: true });
    render = createRender();
    classes = getClasses(<Breadcrumb label="Hello World" />);
  });

  it('should render a <ButtonBase> element', () => {
    const wrapper = shallow(<Breadcrumb label="Hello World" />);
    assert.strictEqual(wrapper.type(), ButtonBase);
  });

  it('should render the root & gutter classes', () => {
    const wrapper = shallow(<Breadcrumb label="Hello World" className="test-class-name" />);
    assert.strictEqual(wrapper.is('.test-class-name'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.gutters), true);
  });

  it('should render the custom className and the root & gutter classes', () => {
    const wrapper = shallow(<Breadcrumb label="Hello World" className="test-class-name" />);
    assert.strictEqual(wrapper.is('.test-class-name'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.gutters), true);
  });

  it('should render an Icon', () => {
    const wrapper = shallow(<Breadcrumb label="Hello World" icon={icon} />);
    const iconWrapper = wrapper.childAt(0);
    assert.strictEqual(iconWrapper.find(Icon).length, 1);
  });

  it('should render the icon with the icon class', () => {
    const wrapper = shallow(<Breadcrumb label="Hello World" icon={icon} />);
    const iconWrapper = wrapper.childAt(0);
    assert.strictEqual(iconWrapper.hasClass(classes.icon), true);
  });

  it('should not receive focus by default', () => {
    const wrapper = shallow(<Breadcrumb label="Hello World" />);
    assert.strictEqual(wrapper.props().tabIndex, -1);
  });

  describe('prop: active', () => {
    let wrapper;
    before(() => {
      wrapper = shallow(<Breadcrumb label="Hello World" href="#" active />);
    });

    it('should render the breadcrumb with the active class', () => {
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass(classes.gutters), true);
      assert.strictEqual(wrapper.hasClass(classes.active), true);
    });

    it('should not receive focus', () => {
      assert.strictEqual(wrapper.props().tabIndex, -1);
    });
  });

  describe('prop: disableGutters', () => {
    it('should render a breadcrumb without the gutters class', () => {
      const wrapper = shallow(<Breadcrumb label="Hello World" disableGutters />);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass(classes.gutters), false);
    });
  });

  describe('prop: href', () => {
    it('should receive focus', () => {
      const wrapper = shallow(<Breadcrumb label="Hello World" href="#" />);
      assert.strictEqual(wrapper.props().tabIndex, 0);
    });
  });

  describe('prop: onClick', () => {
    let handleClick;
    let wrapper;
    before(() => {
      handleClick = spy();
      wrapper = shallow(<Breadcrumb onClick={handleClick} label="Hello World" />);
    });

    it('should be called when clicked', () => {
      const event = {};
      wrapper.simulate('click', event);
      assert.strictEqual(handleClick.callCount, 1);
    });

    it('should receive focus', () => {
      assert.strictEqual(wrapper.props().tabIndex, 0);
    });
  });

  describe('server-side', () => {
    // Only run the test on node.
    if (!/jsdom/.test(window.navigator.userAgent)) {
      return;
    }

    it('should server-side render', () => {
      const markup = render(<Breadcrumb label="Hello World" />);
      assert.strictEqual(markup.text(), 'Hello World');
    });
  });
});
