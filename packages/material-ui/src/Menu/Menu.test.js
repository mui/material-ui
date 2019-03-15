import React from 'react';
import { spy, stub } from 'sinon';
import { assert } from 'chai';
import ReactDOM from 'react-dom';
import { createShallow, createMount, getClasses } from '@material-ui/core/test-utils';
import Popover from '../Popover';
import Menu from './Menu';
import MenuList from '../MenuList';

describe('<Menu />', () => {
  let shallow;
  let classes;
  let mount;
  let defaultProps;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Menu {...defaultProps} />);
    mount = createMount();
    defaultProps = {
      open: false,
      anchorEl: document.createElement('div'),
    };
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a Popover', () => {
    const wrapper = mount(<Menu {...defaultProps} />);
    assert.strictEqual(wrapper.find(Popover).exists(), true);
  });

  it('should fire Popover transition event callbacks', () => {
    const events = ['onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'];

    const handlers = events.reduce((result, n) => {
      result[n] = spy();
      return result;
    }, {});

    const wrapper = shallow(<Menu {...defaultProps} {...handlers} />);

    events.forEach(n => {
      const event = n.charAt(2).toLowerCase() + n.slice(3);
      wrapper.simulate(event, { style: {} });
      assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
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
    const wrapper = mount(<Menu {...defaultProps} />);
    assert.strictEqual(
      wrapper.find(Popover).props().getContentAnchorEl,
      wrapper.find('Menu').instance().getContentAnchorEl,
    );
  });

  it('should pass onClose prop to Popover', () => {
    const fn = () => {};
    const wrapper = shallow(<Menu {...defaultProps} onClose={fn} />);
    assert.strictEqual(wrapper.props().onClose, fn);
  });

  it('should pass anchorEl prop to Popover', () => {
    const el = document.createElement('div');
    const wrapper = shallow(<Menu {...defaultProps} anchorEl={el} />);
    assert.strictEqual(wrapper.props().anchorEl, el);
  });

  it('should pass through the `open` prop to Popover', () => {
    const wrapper = shallow(<Menu {...defaultProps} />);
    assert.strictEqual(wrapper.props().open, false);
    wrapper.setProps({ open: true });
    assert.strictEqual(wrapper.props().open, true);
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

    it('should spread other props on the Popover', () => {
      assert.strictEqual(wrapper.find(Popover).props()['data-test'], 'hi');
    });

    it('should have the user classes', () => {
      assert.strictEqual(wrapper.find(Popover).hasClass('test-class'), true);
    });
  });

  it('should open during the initial mount', () => {
    const wrapper = mount(
      <Menu {...defaultProps} open>
        <div />
      </Menu>,
    );
    const popover = wrapper.find('Popover');
    assert.strictEqual(popover.props().open, true);
    const menuEl = document.querySelector('[data-mui-test="Menu"]');
    assert.strictEqual(document.activeElement, menuEl && menuEl.firstChild);
  });

  describe('mount', () => {
    let wrapper;
    let instance;

    let selectedItemFocusSpy;
    let menuListSpy;
    let menuListFocusSpy;

    let elementForHandleEnter;

    const SELECTED_ITEM_KEY = 111111;
    const MENU_LIST_HEIGHT = 100;

    let findDOMNodeStub;

    before(() => {
      wrapper = mount(<Menu {...defaultProps} classes={classes} />);
      instance = wrapper.find('Menu').instance();

      selectedItemFocusSpy = spy();
      menuListFocusSpy = spy();
      menuListSpy = {};
      menuListSpy.clientHeight = MENU_LIST_HEIGHT;
      menuListSpy.style = {};
      menuListSpy.firstChild = { focus: menuListFocusSpy };

      findDOMNodeStub = stub(ReactDOM, 'findDOMNode').callsFake(arg => {
        if (arg === SELECTED_ITEM_KEY) {
          return { focus: selectedItemFocusSpy };
        }
        return menuListSpy;
      });

      elementForHandleEnter = { clientHeight: MENU_LIST_HEIGHT };
    });

    after(() => {
      findDOMNodeStub.restore();
    });

    beforeEach(() => {
      menuListFocusSpy.resetHistory();
      selectedItemFocusSpy.resetHistory();
    });

    it('should call props.onEntering with element if exists', () => {
      const onEnteringSpy = spy();
      wrapper.setProps({ onEntering: onEnteringSpy });
      instance.handleEntering(elementForHandleEnter);
      assert.strictEqual(onEnteringSpy.callCount, 1);
      assert.strictEqual(onEnteringSpy.calledWith(elementForHandleEnter), true);
    });

    it('should call menuList focus when no menuList', () => {
      delete instance.menuListRef;
      instance.handleEntering(elementForHandleEnter);
      assert.strictEqual(selectedItemFocusSpy.callCount, 0);
      assert.strictEqual(menuListFocusSpy.callCount, 1);
    });

    it('should call menuList focus when menuList but no menuList.selectedItemRef ', () => {
      instance.menuListRef = {};
      delete instance.menuListRef.selectedItemRef;
      instance.handleEntering(elementForHandleEnter);
      assert.strictEqual(selectedItemFocusSpy.callCount, 0);
      assert.strictEqual(menuListFocusSpy.callCount, 1);
    });

    describe('menuList.selectedItemRef exists', () => {
      before(() => {
        instance.menuListRef = {};
        instance.menuListRef.selectedItemRef = SELECTED_ITEM_KEY;
      });

      it('should call selectedItem focus when there is a menuList.selectedItemRef', () => {
        instance.handleEntering(elementForHandleEnter);
        assert.strictEqual(selectedItemFocusSpy.callCount, 1);
        assert.strictEqual(menuListFocusSpy.callCount, 0);
      });

      it('should not set style on list when element.clientHeight > list.clientHeight', () => {
        elementForHandleEnter.clientHeight = MENU_LIST_HEIGHT + 1;
        instance.handleEntering(elementForHandleEnter);
        assert.strictEqual(menuListSpy.style.paddingRight, undefined);
        assert.strictEqual(menuListSpy.style.width, undefined);
      });

      it('should not set style on list when element.clientHeight == list.clientHeight', () => {
        elementForHandleEnter.clientHeight = MENU_LIST_HEIGHT;
        instance.handleEntering(elementForHandleEnter);
        assert.strictEqual(menuListSpy.style.paddingRight, undefined);
        assert.strictEqual(menuListSpy.style.width, undefined);
      });

      it('should not set style on list when element.clientHeight < list.clientHeight', () => {
        assert.strictEqual(menuListSpy.style.paddingRight, undefined);
        assert.strictEqual(menuListSpy.style.width, undefined);
        elementForHandleEnter.clientHeight = MENU_LIST_HEIGHT - 1;
        instance.handleEntering(elementForHandleEnter);
        assert.notStrictEqual(menuListSpy.style.paddingRight, undefined);
        assert.notStrictEqual(menuListSpy.style.width, undefined);
      });
    });
  });
});
