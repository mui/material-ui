import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import {
  createShallow,
  createMount,
  describeConformance,
  getClasses,
  findOutermostIntrinsic,
} from '@material-ui/core/test-utils';
import Tab from './Tab';
import ButtonBase from '../ButtonBase';
import Icon from '../Icon';

describe('<Tab />', () => {
  let shallow;
  let mount;
  let classes;
  const icon = <Icon>restore</Icon>;

  before(() => {
    shallow = createShallow({ dive: true });
    // StrictModeViolation: uses ButtonBase
    mount = createMount({ strict: false });
    classes = getClasses(<Tab textColor="inherit" />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Tab textColor="inherit" />, () => ({
    classes,
    inheritComponent: ButtonBase,
    mount,
    refInstanceof: window.HTMLButtonElement,
    skip: ['componentProp'],
  }));

  it('should have a ripple by default', () => {
    const wrapper = shallow(<Tab />);
    assert.strictEqual(wrapper.props().disableRipple, undefined);
  });

  it('should pass disableRipple to ButtonBase', () => {
    const wrapper = shallow(<Tab disableRipple />);
    assert.strictEqual(wrapper.props().disableRipple, true);
  });

  it('should have a focusRipple by default', () => {
    const wrapper = shallow(<Tab />);
    assert.strictEqual(wrapper.props().focusRipple, true);
  });

  it('should pass disableFocusRipple to ButtonBase', () => {
    const wrapper = shallow(<Tab disableFocusRipple />);
    assert.strictEqual(wrapper.props().focusRipple, false);
  });

  describe('prop: selected', () => {
    it('should render with the selected and root classes', () => {
      const wrapper = mount(<Tab selected textColor="secondary" />);
      const root = wrapper.find(`.${classes.root}`).first();
      assert.strictEqual(root.hasClass(classes.selected), true);
      assert.strictEqual(root.hasClass(classes.textColorSecondary), true);
      assert.strictEqual(root.props()['aria-selected'], true);
    });
  });

  describe('prop: disabled', () => {
    it('should render with the disabled and root classes', () => {
      const wrapper = mount(<Tab disabled textColor="secondary" />);
      const tab = wrapper.find('button');
      assert.strictEqual(tab.hasClass(classes.disabled), true);
      assert.strictEqual(tab.hasClass(classes.textColorSecondary), true);
      assert.strictEqual(tab.hasClass(classes.root), true);
    });
  });

  describe('prop: onClick', () => {
    it('should be called when a click is triggered', () => {
      const handleClick = spy();
      const wrapper = shallow(
        <Tab textColor="inherit" onClick={handleClick} onChange={() => {}} />,
      );
      wrapper.simulate('click');
      assert.strictEqual(handleClick.callCount, 1, 'it should forward the onClick');
    });
  });

  describe('prop: label', () => {
    it('should render label', () => {
      const wrapper = mount(<Tab textColor="inherit" label="foo" />);
      assert.strictEqual(wrapper.text(), 'foo');
    });
  });

  describe('prop: wrapped', () => {
    it('should add the wrapped class', () => {
      const wrapper = mount(<Tab label="foo" wrapped />);
      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.wrapped), true);
    });
  });

  describe('prop: icon', () => {
    it('should render icon element', () => {
      const wrapper = mount(<Tab textColor="inherit" icon={icon} />);
      assert.strictEqual(wrapper.find(Icon).exists(), true);
    });
  });

  describe('prop: textColor', () => {
    it('should support the inherit value', () => {
      const wrapper = mount(<Tab textColor="inherit" selected />);
      const tab = wrapper.find('button');
      assert.strictEqual(tab.hasClass(classes.selected), true);
      assert.strictEqual(tab.hasClass(classes.textColorInherit), true);
      assert.strictEqual(tab.hasClass(classes.root), true);
    });
  });

  describe('prop: fullWidth', () => {
    it('should have the fullWidth class', () => {
      const wrapper = mount(<Tab textColor="inherit" fullWidth />);
      assert.strictEqual(wrapper.find(`button`).hasClass(classes.fullWidth), true);
    });
  });

  describe('prop: style', () => {
    it('should be able to override everything', () => {
      const style = { width: '80%', color: 'red', alignText: 'center' };
      const wrapper = shallow(<Tab fullWidth style={style} />);
      assert.deepEqual(wrapper.props().style, style);
    });
  });
});
