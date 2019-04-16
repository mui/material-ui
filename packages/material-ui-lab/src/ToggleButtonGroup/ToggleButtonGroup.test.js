import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import {
  createMount,
  getClasses,
  findOutermostIntrinsic,
  testRef,
} from '@material-ui/core/test-utils';
import ToggleButtonGroup from './ToggleButtonGroup';
import ToggleButton from '../ToggleButton';

describe('<ToggleButtonGroup />', () => {
  let mount;
  let classes;

  before(() => {
    // StrictModeViolation: uses ButtonBase
    mount = createMount({ strict: false });
    classes = getClasses(
      <ToggleButtonGroup>
        <ToggleButton value="hello" />
      </ToggleButtonGroup>,
    );
  });

  after(() => {
    mount.cleanUp();
  });

  function findToggleButton(wrapper, value) {
    return wrapper
      .find(ToggleButton)
      .find(`[value="${value}"]`)
      .first();
  }

  it('does forward refs', () => {
    testRef(
      <ToggleButtonGroup>
        <ToggleButton value="hello">hello</ToggleButton>
      </ToggleButtonGroup>,
      mount,
    );
  });

  it('should render a <div> element', () => {
    const wrapper = mount(
      <ToggleButtonGroup>
        <ToggleButton value="hello">hello</ToggleButton>
      </ToggleButtonGroup>,
    );
    assert.strictEqual(findOutermostIntrinsic(wrapper).type(), 'div');
  });

  it('should render the custom className and the root class', () => {
    const wrapper = mount(
      <ToggleButtonGroup className="test-class-name">
        <ToggleButton value="hello">hello</ToggleButton>
      </ToggleButtonGroup>,
    );
    const root = findOutermostIntrinsic(wrapper);
    assert.strictEqual(root.hasClass('test-class-name'), true);
    assert.strictEqual(root.hasClass(classes.root), true);
  });

  describe('exclusive', () => {
    it('should render a selected ToggleButton if value is selected', () => {
      const wrapper = mount(
        <ToggleButtonGroup exclusive value="one">
          <ToggleButton value="one">1</ToggleButton>
        </ToggleButtonGroup>,
      );

      assert.strictEqual(findToggleButton(wrapper, 'one').props().selected, true);
    });

    it('should not render a selected ToggleButton when its value is not selected', () => {
      const wrapper = mount(
        <ToggleButtonGroup exclusive value="one">
          <ToggleButton value="one">1</ToggleButton>
          <ToggleButton value="two">2</ToggleButton>
        </ToggleButtonGroup>,
      );

      assert.strictEqual(findToggleButton(wrapper, 'two').props().selected, false);
    });
  });

  describe('non exclusive', () => {
    it('should render a selected ToggleButton if value is selected', () => {
      const wrapper = mount(
        <ToggleButtonGroup value={['one']}>
          <ToggleButton value="one">1</ToggleButton>
          <ToggleButton value="two">2</ToggleButton>
        </ToggleButtonGroup>,
      );

      assert.strictEqual(findToggleButton(wrapper, 'one').props().selected, true);
      assert.strictEqual(findToggleButton(wrapper, 'two').props().selected, false);
    });
  });

  describe('prop: onChange', () => {
    describe('exclusive', () => {
      it('should be null when current value is toggled off', () => {
        const handleChange = spy();
        const wrapper = mount(
          <ToggleButtonGroup value="one" exclusive onChange={handleChange}>
            <ToggleButton value="one">One</ToggleButton>
            <ToggleButton value="two">Two</ToggleButton>
          </ToggleButtonGroup>,
        );

        findToggleButton(wrapper, 'one').simulate('click');

        assert.strictEqual(handleChange.callCount, 1);
        assert.strictEqual(handleChange.args[0][1], null);
      });

      it('should be a single value when value is toggled on', () => {
        const handleChange = spy();
        const wrapper = mount(
          <ToggleButtonGroup exclusive onChange={handleChange}>
            <ToggleButton value="one">One</ToggleButton>
            <ToggleButton value="two">Two</ToggleButton>
          </ToggleButtonGroup>,
        );

        findToggleButton(wrapper, 'one').simulate('click');

        assert.strictEqual(handleChange.callCount, 1);
        assert.strictEqual(handleChange.args[0][1], 'one');
      });

      it('should be a single value when a new value is toggled on', () => {
        const handleChange = spy();
        const wrapper = mount(
          <ToggleButtonGroup exclusive value="one" onChange={handleChange}>
            <ToggleButton value="one">One</ToggleButton>
            <ToggleButton value="two">Two</ToggleButton>
          </ToggleButtonGroup>,
        );

        findToggleButton(wrapper, 'two').simulate('click');

        assert.strictEqual(handleChange.callCount, 1);
        assert.strictEqual(handleChange.args[0][1], 'two');
      });
    });

    describe('non exclusive', () => {
      it('should be an empty array when current value is toggled off', () => {
        const handleChange = spy();
        const wrapper = mount(
          <ToggleButtonGroup value={['one']} onChange={handleChange}>
            <ToggleButton value="one">One</ToggleButton>
            <ToggleButton value="two">Two</ToggleButton>
          </ToggleButtonGroup>,
        );

        findToggleButton(wrapper, 'one').simulate('click');

        assert.strictEqual(handleChange.callCount, 1);
        assert.ok(Array.isArray(handleChange.args[0][1]));
        assert.strictEqual(handleChange.args[0][1].length, 0);
      });

      it('should be an array with a single value when value is toggled on', () => {
        const handleChange = spy();
        const wrapper = mount(
          <ToggleButtonGroup onChange={handleChange}>
            <ToggleButton value="one">One</ToggleButton>
            <ToggleButton value="two">Two</ToggleButton>
          </ToggleButtonGroup>,
        );

        findToggleButton(wrapper, 'one').simulate('click');

        assert.strictEqual(handleChange.callCount, 1);
        assert.deepEqual(handleChange.args[0][1], ['one']);
      });

      it('should be an array with a single value when a secondary value is toggled off', () => {
        const handleChange = spy();
        const wrapper = mount(
          <ToggleButtonGroup value={['one', 'two']} onChange={handleChange}>
            <ToggleButton value="one">One</ToggleButton>
            <ToggleButton value="two">Two</ToggleButton>
          </ToggleButtonGroup>,
        );

        findToggleButton(wrapper, 'one').simulate('click');

        assert.strictEqual(handleChange.callCount, 1);
        assert.deepEqual(handleChange.args[0][1], ['two']);
      });

      it('should be an array of all selected values when a second value is toggled on', () => {
        const handleChange = spy();
        const wrapper = mount(
          <ToggleButtonGroup value={['one']} onChange={handleChange}>
            <ToggleButton value="one">One</ToggleButton>
            <ToggleButton value="two">Two</ToggleButton>
          </ToggleButtonGroup>,
        );

        findToggleButton(wrapper, 'two').simulate('click');

        assert.strictEqual(handleChange.callCount, 1);
        assert.deepEqual(handleChange.args[0][1], ['one', 'two']);
      });
    });
  });
});
