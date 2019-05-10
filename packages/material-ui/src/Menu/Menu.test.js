import React from 'react';
import { spy } from 'sinon';
import { assert } from 'chai';
import { createMount, describeConformance, getClasses } from '@material-ui/core/test-utils';
import Popover from '../Popover';
import Menu from './Menu';
import MenuList from '../MenuList';

const MENU_LIST_HEIGHT = 100;

describe('<Menu />', () => {
  let classes;
  let mount;
  const defaultProps = {
    open: false,
    anchorEl: () => document.createElement('div'),
  };

  before(() => {
    classes = getClasses(<Menu {...defaultProps} />);
    // StrictModeViolation: uses Popover
    mount = createMount({ strict: false });
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Menu {...defaultProps} open />, () => ({
    classes,
    inheritComponent: Popover,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  describe('event callbacks', () => {
    describe('entering', () => {
      it('should fire callbacks', done => {
        const handleEnter = spy();
        const handleEntering = spy();

        const wrapper = mount(
          <Menu
            onEnter={handleEnter}
            onEntering={handleEntering}
            onEntered={() => {
              assert.strictEqual(handleEnter.callCount, 1);
              assert.strictEqual(handleEnter.args[0].length, 1);
              assert.strictEqual(handleEntering.callCount, 1);
              assert.strictEqual(handleEntering.args[0].length, 1);
              done();
            }}
            {...defaultProps}
          />,
        );

        wrapper.setProps({
          open: true,
        });
      });
    });

    describe('exiting', () => {
      it('should fire callbacks', done => {
        const handleExit = spy();
        const handleExiting = spy();

        const wrapper = mount(
          <Menu
            onExit={handleExit}
            onExiting={handleExiting}
            onExited={() => {
              assert.strictEqual(handleExit.callCount, 1);
              assert.strictEqual(handleExit.args[0].length, 1);
              assert.strictEqual(handleExiting.callCount, 1);
              assert.strictEqual(handleExiting.args[0].length, 1);
              done();
            }}
            {...defaultProps}
            open
          />,
        );

        wrapper.setProps({
          open: false,
        });
      });
    });
  });

  it('should pass `classes.paper` to the Popover', () => {
    const wrapper = mount(<Menu {...defaultProps} />);
    assert.strictEqual(wrapper.find(Popover).props().PaperProps.classes.root, classes.paper);
  });

  describe('prop: PopoverClasses', () => {
    it('should be able to change the Popover style', () => {
      const wrapper = mount(<Menu {...defaultProps} PopoverClasses={{ paper: 'bar' }} />);
      assert.strictEqual(wrapper.find(Popover).props().classes.paper, 'bar');
    });
  });

  it('should pass the instance function `getContentAnchorEl` to Popover', () => {
    const menuRef = React.createRef();
    const wrapper = mount(<Menu ref={menuRef} {...defaultProps} />);
    assert.strictEqual(wrapper.find(Popover).props().getContentAnchorEl != null, true);
  });

  it('should pass onClose prop to Popover', () => {
    const fn = () => {};
    const wrapper = mount(<Menu {...defaultProps} onClose={fn} />);
    assert.strictEqual(wrapper.find(Popover).props().onClose, fn);
  });

  it('should pass anchorEl prop to Popover', () => {
    const el = document.createElement('div');
    const wrapper = mount(<Menu {...defaultProps} anchorEl={el} />);
    assert.strictEqual(wrapper.find(Popover).props().anchorEl, el);
  });

  it('should pass through the `open` prop to Popover', () => {
    const wrapper = mount(<Menu {...defaultProps} />);
    assert.strictEqual(wrapper.find(Popover).props().open, false);
    wrapper.setProps({ open: true });
    assert.strictEqual(wrapper.find(Popover).props().open, true);
  });

  describe('list node', () => {
    let wrapper;

    before(() => {
      wrapper = mount(<Menu {...defaultProps} className="test-class" data-test="hi" open />);
    });

    it('should render a MenuList inside the Popover', () => {
      assert.strictEqual(
        wrapper
          .find(Popover)
          .find(MenuList)
          .exists(),
        true,
      );
    });
  });

  it('should open during the initial mount', () => {
    const wrapper = mount(
      <Menu {...defaultProps} open>
        <div tabIndex={-1} />
      </Menu>,
    );
    const popover = wrapper.find(Popover);
    assert.strictEqual(popover.props().open, true);
    const menuEl = document.querySelector('[data-mui-test="Menu"]');
    assert.strictEqual(document.activeElement, menuEl);
  });

  it('should not focus list if autoFocus=false', () => {
    const wrapper = mount(
      <Menu {...defaultProps} autoFocus={false} open>
        <div tabIndex={-1} />
      </Menu>,
    );
    const popover = wrapper.find(Popover);
    assert.strictEqual(popover.props().open, true);
    const menuEl = document.querySelector('[data-mui-test="Menu"]');
    assert.notStrictEqual(document.activeElement, menuEl);
    assert.strictEqual(false, menuEl.contains(document.activeElement));
  });

  it('should call props.onEntering with element if exists', () => {
    const onEnteringSpy = spy();
    const wrapper = mount(<Menu {...defaultProps} onEntering={onEnteringSpy} />);
    const popover = wrapper.find(Popover);

    const elementForHandleEnter = { clientHeight: MENU_LIST_HEIGHT };

    popover.props().onEntering(elementForHandleEnter);
    assert.strictEqual(onEnteringSpy.callCount, 1);
    assert.strictEqual(onEnteringSpy.calledWith(elementForHandleEnter), true);
  });

  it('should call props.onEntering, disableAutoFocusItem', () => {
    const onEnteringSpy = spy();
    const wrapper = mount(
      <Menu disableAutoFocusItem {...defaultProps} onEntering={onEnteringSpy} />,
    );
    const popover = wrapper.find(Popover);

    const elementForHandleEnter = { clientHeight: MENU_LIST_HEIGHT };

    popover.props().onEntering(elementForHandleEnter);
    assert.strictEqual(onEnteringSpy.callCount, 1);
    assert.strictEqual(onEnteringSpy.calledWith(elementForHandleEnter), true);
  });

  it('should call onClose on tab', () => {
    const onCloseSpy = spy();
    const wrapper = mount(
      <Menu {...defaultProps} open onClose={onCloseSpy}>
        <span>hello</span>
      </Menu>,
    );
    wrapper.find('span').simulate('keyDown', {
      key: 'Tab',
    });
    assert.strictEqual(onCloseSpy.callCount, 1);
    assert.strictEqual(onCloseSpy.args[0][1], 'tabKeyDown');
  });
});
