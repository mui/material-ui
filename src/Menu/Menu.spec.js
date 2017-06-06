// @flow

import React from 'react';
import { spy, stub } from 'sinon';
import { assert } from 'chai';
import ReactDOM from 'react-dom';
import { createShallow, createMount } from '../test-utils';
import Menu, { styleSheet } from './Menu';

describe('<Menu />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a Popover', () => {
    const wrapper = shallow(<Menu />);
    assert.strictEqual(wrapper.name(), 'withStyles(Popover)');
  });

  it('should fire Popover transition event callbacks', () => {
    const events = ['onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'];

    const handlers = events.reduce((result, n) => {
      result[n] = spy();
      return result;
    }, {});

    const wrapper = shallow(<Menu {...handlers} />);

    events.forEach(n => {
      const event = n.charAt(2).toLowerCase() + n.slice(3);
      wrapper.simulate(event, { style: {} });
      assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
    });
  });

  it('should pass `classes.root` to the Popover for the className', () => {
    const wrapper = shallow(<Menu />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should be classes.root');
  });

  it('should pass `classes.entered` to the Popover for the enteredClassName', () => {
    const wrapper = shallow(<Menu />);
    assert.strictEqual(
      wrapper.props().enteredClassName,
      classes.entered,
      'should be classes.entered',
    );
  });

  it('should pass the instance function `getContentAnchorEl` to Popover', () => {
    const wrapper = shallow(<Menu />);
    assert.strictEqual(
      wrapper.props().getContentAnchorEl,
      wrapper.instance().getContentAnchorEl,
      'should be the same function',
    );
  });

  it('should pass onRequestClose prop to Popover', () => {
    const fn = () => {};
    const wrapper = shallow(<Menu onRequestClose={fn} />);
    assert.strictEqual(wrapper.props().onRequestClose, fn, 'should be the same function');
  });

  it('should pass anchorEl prop to Popover', () => {
    const el = {};
    const wrapper = shallow(<Menu anchorEl={el} />);
    assert.strictEqual(wrapper.props().anchorEl, el, 'should be the same object');
  });

  it('should pass through the `open` prop to Popover', () => {
    const wrapper = shallow(<Menu />);
    assert.strictEqual(wrapper.props().open, false, 'should have an open prop of false');
    wrapper.setProps({ open: true });
    assert.strictEqual(wrapper.props().open, true, 'should have an open prop of true');
  });

  describe('list node', () => {
    let wrapper;
    let list;

    before(() => {
      wrapper = shallow(<Menu className="test-class" data-test="hi" />);
      list = wrapper.childAt(0);
    });

    it('should render a MenuList inside the Popover', () => {
      assert.strictEqual(
        list.is('MenuList'),
        true,
        'should have a MenuList as the immediate child',
      );
    });

    it('should spread other props on the list', () => {
      assert.strictEqual(wrapper.props()['data-test'], 'hi', 'should have the custom prop');
    });

    it('should have the user classes', () => {
      assert.strictEqual(wrapper.hasClass('test-class'), true, 'should have the user class');
    });
  });

  describe('mount', () => {
    let mount;
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
      mount = createMount();
      wrapper = mount(<Menu.Naked classes={classes} />);
      instance = wrapper.instance();

      selectedItemFocusSpy = spy();
      menuListFocusSpy = spy();
      menuListSpy = {};
      menuListSpy.clientHeight = MENU_LIST_HEIGHT;
      menuListSpy.style = {};
      menuListSpy.firstChild = {
        focus: menuListFocusSpy,
      };

      findDOMNodeStub = stub(ReactDOM, 'findDOMNode').callsFake(arg => {
        if (arg === SELECTED_ITEM_KEY) {
          return {
            focus: selectedItemFocusSpy,
          };
        }
        return menuListSpy;
      });

      elementForHandleEnter = {
        clientHeight: MENU_LIST_HEIGHT,
      };
    });

    after(() => {
      mount.cleanUp();
      findDOMNodeStub.restore();
    });

    beforeEach(() => {
      menuListFocusSpy.reset();
      selectedItemFocusSpy.reset();
    });

    it('should call props.onEnter with element if exists', () => {
      const onEnterSpy = spy();
      wrapper.setProps({ onEnter: onEnterSpy });
      instance.handleEnter(elementForHandleEnter);
      assert.strictEqual(onEnterSpy.callCount, 1);
      assert.strictEqual(onEnterSpy.calledWith(elementForHandleEnter), true);
    });

    it('should call menuList focus when no menuList', () => {
      delete instance.menuList;
      instance.handleEnter(elementForHandleEnter);
      assert.strictEqual(selectedItemFocusSpy.callCount, 0);
      assert.strictEqual(menuListFocusSpy.callCount, 1);
    });

    it('should call menuList focus when menuList but no menuList.selectedItem ', () => {
      instance.menuList = {};
      delete instance.menuList.selectedItem;
      instance.handleEnter(elementForHandleEnter);
      assert.strictEqual(selectedItemFocusSpy.callCount, 0);
      assert.strictEqual(menuListFocusSpy.callCount, 1);
    });

    describe('menuList.selectedItem exists', () => {
      before(() => {
        instance.menuList = {};
        instance.menuList.selectedItem = SELECTED_ITEM_KEY;
      });

      it('should call selectedItem focus when there is a menuList.selectedItem', () => {
        instance.handleEnter(elementForHandleEnter);
        assert.strictEqual(selectedItemFocusSpy.callCount, 1);
        assert.strictEqual(menuListFocusSpy.callCount, 0);
      });

      it('should not set style on list when element.clientHeight > list.clientHeight', () => {
        elementForHandleEnter.clientHeight = MENU_LIST_HEIGHT + 1;
        instance.handleEnter(elementForHandleEnter);
        assert.strictEqual(menuListSpy.style.paddingRight, undefined);
        assert.strictEqual(menuListSpy.style.width, undefined);
      });

      it('should not set style on list when element.clientHeight == list.clientHeight', () => {
        elementForHandleEnter.clientHeight = MENU_LIST_HEIGHT;
        instance.handleEnter(elementForHandleEnter);
        assert.strictEqual(menuListSpy.style.paddingRight, undefined);
        assert.strictEqual(menuListSpy.style.width, undefined);
      });

      it('should not set style on list when element.clientHeight < list.clientHeight', () => {
        assert.strictEqual(menuListSpy.style.paddingRight, undefined);
        assert.strictEqual(menuListSpy.style.width, undefined);
        elementForHandleEnter.clientHeight = MENU_LIST_HEIGHT - 1;
        instance.handleEnter(elementForHandleEnter);
        assert.notStrictEqual(menuListSpy.style.paddingRight, undefined);
        assert.notStrictEqual(menuListSpy.style.width, undefined);
      });
    });
  });
});
