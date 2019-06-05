import React from 'react';
import { assert } from 'chai';
import PropTypes from 'prop-types';
import { spy, useFakeTimers } from 'sinon';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import Popper from '../Popper';
import Tooltip from './Tooltip';
import Input from '../Input';
import createMuiTheme from '../styles/createMuiTheme';

const theme = createMuiTheme();

function focusVisible(wrapper) {
  document.dispatchEvent(new window.Event('keydown'));
  wrapper.simulate('focus');
}

function simulatePointerDevice() {
  // first focus on a page triggers focus visible until a pointer event
  // has been dispatched
  document.dispatchEvent(new window.Event('pointerdown'));
}

describe('<Tooltip />', () => {
  let mount;
  let classes;
  let clock;
  const defaultProps = {
    children: <span id="testChild">Hello World</span>,
    theme,
    title: 'Hello World',
  };

  before(() => {
    // StrictModeViolation: uses Grow and tests a lot of impl details
    mount = createMount({ strict: undefined });
    classes = getClasses(<Tooltip {...defaultProps} />);
    clock = useFakeTimers();
  });

  after(() => {
    clock.restore();
    mount.cleanUp();
  });

  it('should render the correct structure', () => {
    const wrapper = mount(<Tooltip {...defaultProps} />);
    const children = wrapper.childAt(0);
    assert.strictEqual(children.childAt(1).type(), Popper);
    assert.strictEqual(children.childAt(1).hasClass(classes.popper), true);
  });

  describe('prop: disableHoverListener', () => {
    it('should hide the native title', () => {
      const wrapper = mount(
        <Tooltip {...defaultProps} title="Hello World" disableHoverListener>
          <button type="submit">Hello World</button>
        </Tooltip>,
      );

      const children = wrapper.find('button');
      assert.strictEqual(children.props().title, null);
    });
  });

  describe('prop: title', () => {
    it('should display if the title is present', () => {
      const wrapper = mount(<Tooltip {...defaultProps} open />);
      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), true);
    });

    it('should not display if the title is an empty string', () => {
      const wrapper = mount(<Tooltip {...defaultProps} title="" open />);
      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), false);
    });

    it('should be passed down to the child as a native title', () => {
      const wrapper = mount(
        <Tooltip {...defaultProps} title="Hello World">
          <button type="submit">Hello World</button>
        </Tooltip>,
      );

      const children = wrapper.find('button');
      assert.strictEqual(children.props().title, 'Hello World');
    });
  });

  describe('prop: placement', () => {
    it('should have top placement', () => {
      const wrapper = mount(<Tooltip {...defaultProps} placement="top" />);
      assert.strictEqual(wrapper.find(Popper).props().placement, 'top');
    });
  });

  it('should respond to external events', () => {
    const wrapper = mount(<Tooltip {...defaultProps} />);
    const children = wrapper.find('#testChild');
    assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), false);
    children.simulate('mouseOver');
    assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), true);
    children.simulate('mouseLeave');
    assert.strictEqual(wrapper.find(Popper).props().open, false);
    assert.strictEqual(wrapper.find(Popper).props().open, false);
  });

  it('should be controllable', () => {
    const handleRequestOpen = spy();
    const handleClose = spy();

    const wrapper = mount(
      <Tooltip {...defaultProps} open onOpen={handleRequestOpen} onClose={handleClose} />,
    );
    const children = wrapper.find('#testChild');
    assert.strictEqual(handleRequestOpen.callCount, 0);
    assert.strictEqual(handleClose.callCount, 0);
    children.simulate('mouseOver');
    assert.strictEqual(handleRequestOpen.callCount, 1);
    assert.strictEqual(handleClose.callCount, 0);
    children.simulate('mouseLeave');
    assert.strictEqual(handleRequestOpen.callCount, 1);
    assert.strictEqual(handleClose.callCount, 1);
  });

  describe('touch screen', () => {
    it('should not respond to quick events', () => {
      const wrapper = mount(<Tooltip {...defaultProps} />);
      const children = wrapper.find('#testChild');
      children.simulate('touchStart');
      children.simulate('touchEnd');
      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), false);
    });

    it('should open on long press', () => {
      const wrapper = mount(<Tooltip {...defaultProps} />);
      const children = wrapper.find('#testChild');
      children.simulate('touchStart');
      clock.tick(1000);
      wrapper.update();
      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), true);
      children.simulate('touchEnd');
      children.simulate('blur');
      clock.tick(1500);
      assert.strictEqual(wrapper.find(Popper).props().open, false);
    });
  });

  describe('mount', () => {
    it('should mount without any issue', () => {
      mount(<Tooltip {...defaultProps} open />);
    });

    it('should handle autoFocus + onFocus forwarding', () => {
      const AutoFocus = props => (
        <div>
          {props.open ? (
            <Tooltip title="Title">
              <Input value="value" autoFocus />
            </Tooltip>
          ) : null}
        </div>
      );
      AutoFocus.propTypes = {
        open: PropTypes.bool,
      };

      const wrapper = mount(<AutoFocus />);
      wrapper.setProps({ open: true });
      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), false);
      clock.tick(0);
      wrapper.update();
      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), true);
    });
  });

  describe('prop: delay', () => {
    it('should take the enterDelay into account', () => {
      const wrapper = mount(<Tooltip enterDelay={111} {...defaultProps} />);
      simulatePointerDevice();
      const children = wrapper.find('#testChild');
      focusVisible(children);
      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), false);
      clock.tick(111);
      wrapper.update();
      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), true);
    });

    it('should take the leaveDelay into account', () => {
      const childRef = React.createRef();
      const wrapper = mount(
        <Tooltip leaveDelay={111} enterDelay={0} title="tooltip">
          <span id="testChild" ref={childRef} />
        </Tooltip>,
      );
      simulatePointerDevice();
      const children = wrapper.find('#testChild');
      focusVisible(children);
      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), true);
      children.simulate('blur');
      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), true);
      clock.tick(111);
      wrapper.update();
      assert.strictEqual(wrapper.find(Popper).props().open, false);
    });
  });

  describe('prop: overrides', () => {
    [
      'onTouchStart',
      'onTouchEnd',
      'onMouseEnter',
      'onMouseOver',
      'onMouseLeave',
      'onFocus',
      'onBlur',
    ].forEach(name => {
      it(`should be transparent for the ${name} event`, () => {
        const handler = spy();
        const wrapper = mount(
          <Tooltip {...defaultProps} title="Hello World">
            <button id="testChild" type="submit" {...{ [name]: handler }}>
              Hello World
            </button>
          </Tooltip>,
        );
        const children = wrapper.find('#testChild');
        const type = name.slice(2).toLowerCase();
        children.simulate(type);
        clock.tick(0);
        assert.strictEqual(handler.callCount, 1);
      });
    });
  });

  describe('disabled button warning', () => {
    beforeEach(() => {
      consoleErrorMock.spy();
    });

    afterEach(() => {
      consoleErrorMock.reset();
    });

    it('should not raise a warning if title is empty', () => {
      mount(
        <Tooltip title="">
          <button type="submit" disabled>
            Hello World
          </button>
        </Tooltip>,
      );
      assert.strictEqual(consoleErrorMock.callCount(), 0, 'should not call console.error');
    });

    it('should raise a warning when we are uncontrolled and can not listen to events', () => {
      mount(
        <Tooltip title="Hello World">
          <button type="submit" disabled>
            Hello World
          </button>
        </Tooltip>,
      );
      assert.strictEqual(consoleErrorMock.callCount(), 1, 'should call console.error');
      assert.match(
        consoleErrorMock.args()[0][0],
        /Material-UI: you are providing a disabled `button` child to the Tooltip component/,
      );
    });

    it('should not raise a warning when we are controlled', () => {
      mount(
        <Tooltip title="Hello World" open>
          <button type="submit" disabled>
            Hello World
          </button>
        </Tooltip>,
      );
      assert.strictEqual(consoleErrorMock.callCount(), 0);
    });
  });

  describe('prop: interactive', () => {
    it('should keep the overlay open if the popper element is hovered', () => {
      const wrapper = mount(
        <Tooltip title="Hello World" interactive leaveDelay={111}>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );

      const children = wrapper.find('#testChild');
      children.simulate('mouseOver', { type: 'mouseOver' });
      clock.tick(0);
      assert.strictEqual(wrapper.find(Popper).props().open, true);
      const popper = wrapper.find(Popper);
      children.simulate('mouseLeave', { type: 'mouseleave' });
      assert.strictEqual(wrapper.find(Popper).props().open, true);
      popper.simulate('mouseOver', { type: 'mouseover' });
      clock.tick(111);
      assert.strictEqual(wrapper.find(Popper).props().open, true);
    });
  });

  describe('forward', () => {
    it('should forward properties to the child element', () => {
      const wrapper = mount(
        <Tooltip className="foo" {...defaultProps}>
          <h1 className="bar">H1</h1>
        </Tooltip>,
      );
      assert.strictEqual(wrapper.find('h1').props().className, 'foo bar');
    });

    it('should respect the properties priority', () => {
      const wrapper = mount(
        <Tooltip hidden {...defaultProps}>
          <h1 hidden={false}>H1</h1>
        </Tooltip>,
      );
      assert.strictEqual(wrapper.find('h1').props().hidden, false);
    });
  });

  describe('focus', () => {
    function Test() {
      return (
        <Tooltip enterDelay={0} leaveDelay={0} title="Some information">
          <button id="target" type="button">
            Do something
          </button>
        </Tooltip>
      );
    }

    it('ignores base focus', () => {
      const wrapper = mount(<Test />);
      simulatePointerDevice();

      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), false);

      wrapper.find('#target').simulate('focus');

      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), false);
    });

    it('opens on focus-visible', () => {
      const wrapper = mount(<Test />);
      simulatePointerDevice();

      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), false);

      focusVisible(wrapper.find('#target'));

      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), true);
    });
  });
});
