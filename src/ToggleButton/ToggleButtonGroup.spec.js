import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow, createMount, createRender, getClasses } from '../test-utils';
import ToggleButton from './ToggleButton';
import ToggleButtonGroup from './ToggleButtonGroup';

describe('<ToggleButtonGroup />', () => {
  let shallow;
  let render;
  let classes;
  let mount;

  before(() => {
    shallow = createShallow({ dive: true });
    render = createRender();
    mount = createMount();
    classes = getClasses(
      <ToggleButtonGroup>
        <ToggleButton />
      </ToggleButtonGroup>,
    );
  });

  it('should render the custom className and the root class', () => {
    const wrapper = shallow(
      <ToggleButtonGroup className="test-class-name">
        <ToggleButton />
      </ToggleButtonGroup>,
    );
    assert.strictEqual(wrapper.is('.test-class-name'), true, 'should pass the test className');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render a selected group', () => {
    const wrapper = shallow(
      <ToggleButtonGroup selected>
        <ToggleButton />
      </ToggleButtonGroup>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.selected), true, 'should have the selected class');
  });

  it('should render a selected group if value matches a ToggleButton', () => {
    const wrapper = shallow(
      <ToggleButtonGroup value={['bold']}>
        <ToggleButton value="bold" />
      </ToggleButtonGroup>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.selected), true, 'should have the selected class');
  });

  it('should pass selected state to ToggleButton with matching value', () => {
    const wrapper = shallow(
      <ToggleButtonGroup value={['bold']}>
        <ToggleButton value="bold" />
        <ToggleButton value="italic" />
      </ToggleButtonGroup>,
    );
    assert.strictEqual(
      wrapper
        .find(ToggleButton)
        .at(0)
        .props().selected,
      true,
      'should have selected true',
    );
    assert.strictEqual(
      wrapper
        .find(ToggleButton)
        .at(1)
        .props().selected,
      false,
      'should not have selected true',
    );
  });

  describe('prop: onChange', () => {
    it('should call onChange when clicking with all selected values', () => {
      const handleChange = spy();
      const wrapper = mount(
        <ToggleButtonGroup onChange={handleChange}>
          <ToggleButton value="bold" />
          <ToggleButton value="italic" />
        </ToggleButtonGroup>,
      );
      wrapper
        .find(ToggleButton)
        .at(0)
        .simulate('click');
      assert.strictEqual(handleChange.callCount, 1, 'should have been called once');
      assert.deepEqual(
        handleChange.args[0][1],
        ['bold'],
        'should have been called with value ["bold"]',
      );
      wrapper.unmount();
    });

    it('should call onChange when clicking with a single value when exclusive', () => {
      const handleChange = spy();
      const wrapper = mount(
        <ToggleButtonGroup onChange={handleChange} exclusive>
          <ToggleButton value="bold" />
          <ToggleButton value="italic" />
        </ToggleButtonGroup>,
      );
      wrapper
        .find(ToggleButton)
        .at(0)
        .simulate('click');
      assert.strictEqual(handleChange.callCount, 1, 'should have been called once');
      assert.strictEqual(
        handleChange.args[0][1],
        'bold',
        'should have been called with value "bold"',
      );
      wrapper.unmount();
    });
  });

  describe('server side', () => {
    // Only run the test on node.
    if (!/jsdom/.test(window.navigator.userAgent)) {
      return;
    }

    it('should server side render', () => {
      const markup = render(
        <ToggleButtonGroup selected>
          <ToggleButton>Hello World</ToggleButton>
        </ToggleButtonGroup>,
      );
      assert.strictEqual(markup.text(), 'Hello World');
    });
  });
});
