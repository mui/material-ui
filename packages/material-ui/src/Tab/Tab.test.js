import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import {
  createShallow,
  createMount,
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
    mount = createMount();
    classes = getClasses(<Tab textColor="inherit" />);
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render with the root class', () => {
    const wrapper = shallow(<Tab textColor="inherit" />);
    assert.strictEqual(wrapper.type(), ButtonBase);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  describe('prop: className', () => {
    it('should render with the user and root classes', () => {
      const wrapper = shallow(<Tab textColor="inherit" className="woofTab" />);
      assert.strictEqual(wrapper.hasClass('woofTab'), true);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
    });
  });

  describe('prop: selected', () => {
    it('should render with the selected and root classes', () => {
      const wrapper = shallow(<Tab selected textColor="secondary" />);
      assert.strictEqual(wrapper.hasClass(classes.selected), true);
      assert.strictEqual(wrapper.hasClass(classes.textColorSecondary), true);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.props()['aria-selected'], true);
    });
  });

  describe('prop: disabled', () => {
    it('should render with the disabled and root classes', () => {
      const wrapper = shallow(<Tab disabled textColor="secondary" />);
      assert.strictEqual(wrapper.hasClass(classes.disabled), true);
      assert.strictEqual(wrapper.hasClass(classes.textColorSecondary), true);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
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
      const wrapper = shallow(<Tab textColor="inherit" icon={icon} />);
      const iconWrapper = wrapper.childAt(0).childAt(0);
      assert.strictEqual(iconWrapper.is(Icon), true);
    });
  });

  describe('prop: textColor', () => {
    it('should support the inherit value', () => {
      const wrapper = shallow(<Tab selected textColor="inherit" />);
      assert.strictEqual(wrapper.hasClass(classes.selected), true);
      assert.strictEqual(wrapper.hasClass(classes.textColorInherit), true);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
    });
  });

  describe('prop: fullWidth', () => {
    it('should have the fullWidth class', () => {
      const wrapper = shallow(<Tab textColor="inherit" fullWidth />);
      assert.strictEqual(wrapper.hasClass(classes.fullWidth), true);
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
