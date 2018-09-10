import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createRender, createShallow, getClasses } from '@material-ui/core/test-utils';
import ButtonBase from '@material-ui/core/ButtonBase';
import ToggleButton from './ToggleButton';

describe('<ToggleButton />', () => {
  let shallow;
  let render;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    render = createRender();
    classes = getClasses(<ToggleButton value="classes">Hello World</ToggleButton>);
  });

  it('should render a <ButtonBase> element', () => {
    const wrapper = shallow(<ToggleButton value="hello">Hello World</ToggleButton>);
    assert.strictEqual(wrapper.type(), ButtonBase);
  });

  it('should render the custom className and the root class', () => {
    const wrapper = shallow(
      <ToggleButton className="test-class-name" value="hello">
        Hello World
      </ToggleButton>,
    );
    assert.strictEqual(wrapper.is('.test-class-name'), true, 'should pass the test className');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render a selected button', () => {
    const wrapper = shallow(
      <ToggleButton selected value="hello">
        Hello World
      </ToggleButton>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.selected), true, 'should have the selected class');
  });

  it('should render a disabled button', () => {
    const wrapper = shallow(
      <ToggleButton disabled value="hello">
        Hello World
      </ToggleButton>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.disabled), true, 'should have the disabled class');
  });

  describe('prop: onChange', () => {
    it('should be called when clicked', () => {
      const handleChange = spy();
      const wrapper = shallow(
        <ToggleButton value="1" onChange={handleChange}>
          Hello
        </ToggleButton>,
      );
      const event = {};

      wrapper.simulate('click', event);

      assert.strictEqual(handleChange.callCount, 1);
    });

    it('should be called with the button value', () => {
      const handleChange = spy();
      const wrapper = shallow(
        <ToggleButton value="one" onChange={handleChange}>
          Hello
        </ToggleButton>,
      );
      const event = {};

      wrapper.simulate('click', event);

      assert.strictEqual(handleChange.callCount, 1);
      assert.strictEqual(handleChange.args[0][1], 'one');
    });

    it('should not be called if the click is prevented', () => {
      const handleChange = spy();
      const wrapper = shallow(
        <ToggleButton value="one" onChange={handleChange} onClick={e => e.preventDefault()}>
          Hello
        </ToggleButton>,
      );
      const event = {
        preventDefault: () => {},
        isDefaultPrevented: () => true,
      };

      wrapper.simulate('click', event);

      assert.strictEqual(handleChange.callCount, 0);
    });
  });

  describe('server side', () => {
    // Only run the test on node.
    if (!/jsdom/.test(window.navigator.userAgent)) {
      return;
    }

    it('should server side render', () => {
      const markup = render(<ToggleButton value="hello">Hello World</ToggleButton>);
      assert.strictEqual(markup.text(), 'Hello World');
    });
  });
});
