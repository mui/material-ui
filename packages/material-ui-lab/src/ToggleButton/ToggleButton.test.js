import React from 'react';
import { assert } from 'chai';
import {
  createRender,
  createMount,
  findOutermostIntrinsic,
  getClasses,
} from '@material-ui/core/test-utils';
import ButtonBase from '@material-ui/core/ButtonBase';
import ToggleButtonGroup from '../ToggleButtonGroup';
import ToggleButton from './ToggleButton';

describe('<ToggleButton />', () => {
  let mount;
  let render;
  let classes;

  before(() => {
    mount = createMount();
    render = createRender();
    classes = getClasses(<ToggleButton value="classes">Hello World</ToggleButton>);
  });

  after(() => {
    mount.cleanUp();
  });

  function findButton(wrapper, value) {
    return wrapper.find(`ToggleButton[value="${value}"]`).first();
  }

  it('should render a <ButtonBase> element', () => {
    const wrapper = mount(<ToggleButton value="hello">Hello World</ToggleButton>);
    assert.strictEqual(wrapper.contains(ButtonBase), true);
  });

  it('should render the custom className and the root class', () => {
    const wrapper = mount(
      <ToggleButton className="test-class-name" value="hello">
        Hello World
      </ToggleButton>,
    );
    const root = findOutermostIntrinsic(wrapper);
    assert.strictEqual(root.hasClass('test-class-name'), true);
    assert.strictEqual(root.hasClass(classes.root), true);
  });

  it('should render a selected button', () => {
    const wrapper = mount(
      <ToggleButton selected value="hello">
        Hello World
      </ToggleButton>,
    );
    const root = findOutermostIntrinsic(wrapper);
    assert.strictEqual(root.is(`button.${classes.selected}`), true);
  });

  it('should render a disabled button', () => {
    const wrapper = mount(
      <ToggleButton disabled value="hello">
        Hello World
      </ToggleButton>,
    );
    const root = findOutermostIntrinsic(wrapper);
    assert.strictEqual(root.is('button[disabled]'), true);
  });

  describe('exclusive', () => {
    it('should render a selected ToggleButton if value is selected', () => {
      const wrapper = mount(
        <ToggleButtonGroup exclusive value="one">
          <ToggleButton value="one">1</ToggleButton>
        </ToggleButtonGroup>,
      );

      assert.strictEqual(
        findButton(wrapper, 'one')
          .childAt(0)
          .hasClass(classes.selected),
        true,
      );
    });

    it('should not render a selected ToggleButton when its value is not selected', () => {
      const wrapper = mount(
        <ToggleButtonGroup exclusive value="one">
          <ToggleButton value="one">1</ToggleButton>
          <ToggleButton value="two">2</ToggleButton>
        </ToggleButtonGroup>,
      );

      assert.strictEqual(
        findButton(wrapper, 'two')
          .childAt(0)
          .hasClass(classes.selected),
        false,
      );
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

      assert.strictEqual(
        findButton(wrapper, 'one')
          .childAt(0)
          .hasClass(classes.selected),
        true,
      );
      assert.strictEqual(
        findButton(wrapper, 'two')
          .childAt(0)
          .hasClass(classes.selected),
        false,
      );
    });
  });

  describe('server-side', () => {
    // Only run the test on node.
    if (!/jsdom/.test(window.navigator.userAgent)) {
      return;
    }

    it('should server-side render', () => {
      const markup = render(<ToggleButton value="hello">Hello World</ToggleButton>);
      assert.strictEqual(markup.text(), 'Hello World');
    });
  });
});
