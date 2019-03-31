import React from 'react';
import { assert } from 'chai';
import clsx from 'clsx';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import SwitchBase from '../internal/SwitchBase';
import Switch from './Switch';

describe('<Switch />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ untilSelector: 'span' });
    classes = getClasses(<Switch />);
  });

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

    it('should render a span with the root and user classes', () => {
      assert.strictEqual(wrapper.name(), 'span');
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass('foo'), true);
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
