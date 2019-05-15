import React from 'react';
import { assert } from 'chai';
import clsx from 'clsx';
import {
  createMount,
  createShallow,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import SwitchBase from '../internal/SwitchBase';
import Switch from './Switch';

describe('<Switch />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    shallow = createShallow({ untilSelector: 'span' });
    classes = getClasses(<Switch />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Switch />, () => ({
    mount,
    only: ['refForwarding'],
    refInstanceof: window.HTMLSpanElement,
  }));

  /* TODO Switch violates root component
  describeConformance(<Switch />, () => ({
    classes,
    inheritComponent: IconButton,
    mount,
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp'],
  })); */

  describe('styleSheet', () => {
    it('should have the classes required for SwitchBase', () => {
      assert.strictEqual(typeof classes.root, 'string');
      assert.strictEqual(typeof classes.checked, 'string');
      assert.strictEqual(typeof classes.disabled, 'string');
    });
  });

  describe('default Switch export', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<Switch className="foo" />);
    });

    it('should render SwitchBase with a custom span icon with the thumb class', () => {
      const switchBase = wrapper.childAt(0);
      assert.strictEqual(switchBase.type(), SwitchBase);
      assert.strictEqual(switchBase.props().icon.type, 'span');
      assert.strictEqual(switchBase.props().icon.props.className, classes.thumb);
      assert.strictEqual(switchBase.props().checkedIcon.type, 'span');
      assert.strictEqual(
        switchBase.props().checkedIcon.props.className,
        clsx(classes.thumb, classes.thumbChecked),
      );
    });

    it('should render the track as the 2nd child', () => {
      const track = wrapper.childAt(1);
      assert.strictEqual(track.name(), 'span');
      assert.strictEqual(track.hasClass(classes.track), true);
    });
  });
});
