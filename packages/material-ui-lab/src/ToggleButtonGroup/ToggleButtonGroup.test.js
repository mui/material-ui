import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createMount, createShallow, getClasses } from '@material-ui/core/test-utils';
import ToggleButtonGroup from './ToggleButtonGroup';
import ToggleButton from '../ToggleButton';

describe('<ToggleButtonGroup />', () => {
  let shallow;
  let mount;
  let classes;

  before(() => {
    mount = createMount();
    shallow = createShallow({ dive: true });
    classes = getClasses(
      <ToggleButtonGroup>
        <ToggleButton value="hello" />
      </ToggleButtonGroup>,
    );
  });

  it('should render a <div> element', () => {
    const wrapper = shallow(
      <ToggleButtonGroup>
        <ToggleButton value="hello" />
      </ToggleButtonGroup>,
    );
    assert.strictEqual(wrapper.type(), 'div');
  });

  it('should render the custom className and the root class', () => {
    const wrapper = shallow(
      <ToggleButtonGroup className="test-class-name">
        <ToggleButton value="hello" />
      </ToggleButtonGroup>,
    );
    assert.strictEqual(wrapper.is('.test-class-name'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should not render a selected div when selected is "auto" and a value is missing', () => {
    const wrapper = shallow(
      <ToggleButtonGroup selected="auto">
        <ToggleButton value="hello" />
      </ToggleButtonGroup>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.selected), false);
  });

  describe('exclusive', () => {
    it('should render a selected ToggleButton if value is selected', () => {
      const wrapper = shallow(
        <ToggleButtonGroup selected="auto" exclusive value="one">
          <ToggleButton value="one" />
        </ToggleButtonGroup>,
      );
      const buttonWrapper = wrapper.find(ToggleButton);

      assert.strictEqual(buttonWrapper.props().selected, true);
    });

    it('should not render a selected ToggleButton when its value is not selected', () => {
      const wrapper = shallow(
        <ToggleButtonGroup selected="auto" exclusive value="one">
          <ToggleButton value="one" />
          <ToggleButton value="two" />
        </ToggleButtonGroup>,
      );
      const buttonWrapper = wrapper.find(ToggleButton).at(1);

      assert.strictEqual(buttonWrapper.props().selected, false);
    });
  });

  describe('non exclusive', () => {
    it('should render a selected ToggleButton if value is selected', () => {
      const wrapper = shallow(
        <ToggleButtonGroup selected="auto" value={['one']}>
          <ToggleButton value="one" />
          <ToggleButton value="two" />
        </ToggleButtonGroup>,
      );

      assert.strictEqual(
        wrapper
          .find(ToggleButton)
          .at(0)
          .props().selected,
        true,
      );
      assert.strictEqual(
        wrapper
          .find(ToggleButton)
          .at(1)
          .props().selected,
        false,
      );
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

        wrapper
          .find(ToggleButton)
          .at(0)
          .simulate('click');

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

        wrapper
          .find(ToggleButton)
          .at(0)
          .simulate('click');

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

        wrapper
          .find(ToggleButton)
          .at(1)
          .simulate('click');

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

        wrapper
          .find(ToggleButton)
          .at(0)
          .simulate('click');

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

        wrapper
          .find(ToggleButton)
          .at(0)
          .simulate('click');

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

        wrapper
          .find(ToggleButton)
          .at(0)
          .simulate('click');

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

        wrapper
          .find(ToggleButton)
          .at(1)
          .simulate('click');

        assert.strictEqual(handleChange.callCount, 1);
        assert.deepEqual(handleChange.args[0][1], ['one', 'two']);
      });
    });
  });
});
