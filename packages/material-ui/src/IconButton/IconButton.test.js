import React from 'react';
import { assert } from 'chai';
import PropTypes from 'prop-types';
import {
  createShallow,
  createMount,
  describeConformance,
  getClasses,
  findOutermostIntrinsic,
} from '@material-ui/core/test-utils';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import Icon from '../Icon';
import ButtonBase from '../ButtonBase';
import IconButton from './IconButton';

describe('<IconButton />', () => {
  let shallow;
  let classes;
  let mount;

  before(() => {
    shallow = createShallow({ dive: true });
    // StrictModeViolation: uses ButtonBase
    mount = createMount({ strict: false });
    classes = getClasses(<IconButton />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<IconButton>book</IconButton>, () => ({
    classes,
    inheritComponent: ButtonBase,
    mount,
    refInstanceof: window.HTMLButtonElement,
    skip: ['componentProp'],
  }));

  it('should render an inner label span (bloody safari)', () => {
    const wrapper = shallow(<IconButton>book</IconButton>);
    const label = wrapper.childAt(0);
    assert.strictEqual(label.hasClass(classes.label), true);
    assert.strictEqual(label.name(), 'span');
  });

  it('should render the child normally inside the label span', () => {
    const child = <p>H</p>;
    const wrapper = shallow(<IconButton>{child}</IconButton>);
    const label = wrapper.childAt(0);
    const icon = label.childAt(0);
    assert.strictEqual(icon.equals(child), true);
  });

  it('should render Icon children with right classes', () => {
    const childClassName = 'child-woof';
    const iconChild = <Icon className={childClassName} />;
    const wrapper = shallow(<IconButton>{iconChild}</IconButton>);
    const label = wrapper.childAt(0);
    const renderedIconChild = label.childAt(0);
    assert.strictEqual(renderedIconChild.type(), Icon);
    assert.strictEqual(renderedIconChild.hasClass(childClassName), true);
  });

  it('should have a ripple by default', () => {
    const wrapper = shallow(<IconButton>book</IconButton>);
    assert.strictEqual(wrapper.props().disableRipple, undefined);
  });

  it('should pass disableRipple to ButtonBase', () => {
    const wrapper = shallow(<IconButton disableRipple>book</IconButton>);
    assert.strictEqual(wrapper.props().disableRipple, true);
  });

  it('should pass centerRipple={true} to ButtonBase', () => {
    const wrapper = shallow(<IconButton>book</IconButton>);
    assert.strictEqual(wrapper.props().centerRipple, true);
  });

  it('should have a focusRipple by default', () => {
    const wrapper = shallow(<IconButton>book</IconButton>);
    assert.strictEqual(wrapper.props().focusRipple, true);
  });

  it('should pass disableFocusRipple to ButtonBase', () => {
    const wrapper = shallow(<IconButton disableFocusRipple>book</IconButton>);
    assert.strictEqual(wrapper.props().focusRipple, false);
  });

  describe('prop: size', () => {
    it('should render the right class', () => {
      let wrapper;
      wrapper = mount(<IconButton size="small">book</IconButton>);
      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.sizeSmall), true);
      wrapper = mount(<IconButton size="medium">book</IconButton>);
      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.sizeSmall), false);
      wrapper = mount(<IconButton>book</IconButton>);
      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.sizeSmall), false);
    });
  });

  describe('prop: edge', () => {
    it('edge="start" should render the right class', () => {
      const wrapper = mount(<IconButton edge="start">book</IconButton>);
      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.edgeStart), true);
    });
    it('edge="end" should render the right class', () => {
      const wrapper = mount(<IconButton edge="end">book</IconButton>);
      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.edgeEnd), true);
    });
    it('no edge should render the right class', () => {
      const wrapper = mount(<IconButton>book</IconButton>);
      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.edgeStart), false);
      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.edgeEnd), false);
    });
  });

  describe('prop: disabled', () => {
    it('should disable the component', () => {
      const wrapper = shallow(<IconButton disabled>book</IconButton>);
      assert.strictEqual(wrapper.props().disabled, true);
      assert.strictEqual(wrapper.hasClass(classes.disabled), true);
    });
  });

  describe('Firefox onClick', () => {
    beforeEach(() => {
      consoleErrorMock.spy();
    });

    afterEach(() => {
      consoleErrorMock.reset();
      PropTypes.resetWarningCache();
    });

    it('should raise a warning', () => {
      mount(
        <IconButton>
          <svg onClick={() => {}} />
        </IconButton>,
      );
      assert.strictEqual(consoleErrorMock.callCount(), 1);
      assert.include(consoleErrorMock.args()[0][0], 'you are providing an onClick event listener');
    });
  });
});
