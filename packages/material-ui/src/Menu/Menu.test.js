import * as React from 'react';
import { spy } from 'sinon';
import { expect } from 'chai';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import Popover from '../Popover';
import Menu from './Menu';
import MenuList from '../MenuList';
import consoleErrorMock from 'test/utils/consoleErrorMock';

const MENU_LIST_HEIGHT = 100;

describe('<Menu />', () => {
  let classes;
  // StrictModeViolation: uses Popover
  const mount = createMount({ strict: false });
  const defaultProps = {
    open: false,
    anchorEl: () => document.createElement('div'),
  };

  before(() => {
    classes = getClasses(<Menu {...defaultProps} />);
  });

  describeConformance(<Menu {...defaultProps} open />, () => ({
    classes,
    inheritComponent: Popover,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: [
      'componentProp',
      // react-transition-group issue
      'reactTestRenderer',
    ],
  }));

  describe('event callbacks', () => {
    describe('entering', () => {
      it('should fire callbacks', (done) => {
        const handleEnter = spy();
        const handleEntering = spy();

        const wrapper = mount(
          <Menu
            onEnter={handleEnter}
            onEntering={handleEntering}
            onEntered={() => {
              expect(handleEnter.callCount).to.equal(1);
              expect(handleEnter.args[0].length).to.equal(2);
              expect(handleEntering.callCount).to.equal(1);
              expect(handleEntering.args[0].length).to.equal(2);
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
      it('should fire callbacks', (done) => {
        const handleExit = spy();
        const handleExiting = spy();

        const wrapper = mount(
          <Menu
            onExit={handleExit}
            onExiting={handleExiting}
            onExited={() => {
              expect(handleExit.callCount).to.equal(1);
              expect(handleExit.args[0].length).to.equal(1);
              expect(handleExiting.callCount).to.equal(1);
              expect(handleExiting.args[0].length).to.equal(1);
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
    expect(wrapper.find(Popover).props().PaperProps.classes.root).to.equal(classes.paper);
  });

  describe('prop: PopoverClasses', () => {
    it('should be able to change the Popover style', () => {
      const wrapper = mount(<Menu {...defaultProps} PopoverClasses={{ paper: 'bar' }} />);
      expect(wrapper.find(Popover).props().classes.paper).to.equal('bar');
    });
  });

  it('should pass the instance function `getContentAnchorEl` to Popover', () => {
    const menuRef = React.createRef();
    const wrapper = mount(<Menu ref={menuRef} {...defaultProps} />);
    expect(wrapper.find(Popover).props().getContentAnchorEl != null).to.equal(true);
  });

  it('should pass onClose prop to Popover', () => {
    const fn = () => {};
    const wrapper = mount(<Menu {...defaultProps} onClose={fn} />);
    expect(wrapper.find(Popover).props().onClose).to.equal(fn);
  });

  it('should pass anchorEl prop to Popover', () => {
    const el = document.createElement('div');
    const wrapper = mount(<Menu {...defaultProps} anchorEl={el} />);
    expect(wrapper.find(Popover).props().anchorEl).to.equal(el);
  });

  it('should pass through the `open` prop to Popover', () => {
    const wrapper = mount(<Menu {...defaultProps} />);
    expect(wrapper.find(Popover).props().open).to.equal(false);
    wrapper.setProps({ open: true });
    expect(wrapper.find(Popover).props().open).to.equal(true);
  });

  describe('list node', () => {
    it('should render a MenuList inside the Popover', () => {
      const wrapper = mount(<Menu {...defaultProps} className="test-class" data-test="hi" open />);
      expect(wrapper.find(Popover).find(MenuList).exists()).to.equal(true);
    });
  });

  it('should open during the initial mount', () => {
    const wrapper = mount(
      <Menu {...defaultProps} open>
        <div role="menuitem" tabIndex={-1}>
          one
        </div>
      </Menu>,
    );
    const popover = wrapper.find(Popover);
    expect(popover.props().open).to.equal(true);
    expect(wrapper.find('[role="menuitem"]').props().autoFocus).to.equal(true);
  });

  it('should not focus list if autoFocus=false', () => {
    const wrapper = mount(
      <Menu {...defaultProps} autoFocus={false} open>
        <div tabIndex={-1} />
      </Menu>,
    );
    const popover = wrapper.find(Popover);
    expect(popover.props().open).to.equal(true);
    const menuEl = document.querySelector('[data-mui-test="Menu"]');
    expect(document.activeElement).to.not.equal(menuEl);
    expect(false).to.equal(menuEl.contains(document.activeElement));
  });

  it('should call props.onEntering with element if exists', () => {
    const onEnteringSpy = spy();
    const wrapper = mount(<Menu {...defaultProps} onEntering={onEnteringSpy} />);
    const popover = wrapper.find(Popover);

    const elementForHandleEnter = { clientHeight: MENU_LIST_HEIGHT };

    popover.props().onEntering(elementForHandleEnter);
    expect(onEnteringSpy.callCount).to.equal(1);
    expect(onEnteringSpy.calledWith(elementForHandleEnter)).to.equal(true);
  });

  it('should call props.onEntering, disableAutoFocusItem', () => {
    const onEnteringSpy = spy();
    const wrapper = mount(
      <Menu disableAutoFocusItem {...defaultProps} onEntering={onEnteringSpy} />,
    );
    const popover = wrapper.find(Popover);

    const elementForHandleEnter = { clientHeight: MENU_LIST_HEIGHT };

    popover.props().onEntering(elementForHandleEnter);
    expect(onEnteringSpy.callCount).to.equal(1);
    expect(onEnteringSpy.calledWith(elementForHandleEnter)).to.equal(true);
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
    expect(onCloseSpy.callCount).to.equal(1);
    expect(onCloseSpy.args[0][1]).to.equal('tabKeyDown');
  });

  it('ignores invalid children', () => {
    const wrapper = mount(
      <Menu {...defaultProps} open>
        {null}
        <span role="menuitem">hello</span>
        {/* testing conditional rendering */}
        {false && <span role="menuitem">hello</span>}
        {undefined}
        foo
      </Menu>,
    );

    expect(wrapper.find('span[role="menuitem"]')).to.have.length(1);
  });

  describe('warnings', () => {
    before(() => {
      consoleErrorMock.spy();
    });

    after(() => {
      consoleErrorMock.reset();
    });

    it('warns a Fragment is passed as a child', () => {
      mount(
        <Menu anchorEl={document.createElement('div')} open>
          <React.Fragment />
        </Menu>,
      );

      expect(consoleErrorMock.callCount()).to.equal(2);
      expect(consoleErrorMock.messages()[0]).to.include(
        "Material-UI: The Menu component doesn't accept a Fragment as a child.",
      );
    });
  });
});
