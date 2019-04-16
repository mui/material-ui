import React from 'react';
import { assert } from 'chai';
import { stub } from 'sinon';
import { createMount, describeConformance } from '@material-ui/core/test-utils';
import MenuList from './MenuList';
import getScrollbarSize from '../utils/getScrollbarSize';
import List from '../List';

function setStyleWidthForJsdomOrBrowser(style, width) {
  style.width = '';
  style.width = 'calc(100% + 0px)';
  if (style.width !== 'calc(100% + 0px)') {
    // For jsdom
    Object.defineProperty(style, 'width', { writable: true, value: '' });
  }
  style.width = width;
}

describe('<MenuList />', () => {
  let mount;

  before(() => {
    mount = createMount({ strict: true });
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<MenuList />, () => ({
    classes: {},
    inheritComponent: List,
    mount,
    refInstanceof: window.HTMLUListElement,
    skip: ['componentProp'],
  }));

  describe('prop: children', () => {
    it('should support invalid children', () => {
      const wrapper = mount(
        <MenuList>
          <div />
          <div />
          {null}
        </MenuList>,
      );
      assert.strictEqual(wrapper.find('div').length, 2);
    });
  });

  describe('actions: adjustStyleForScrollbar', () => {
    const expectedPadding = `${getScrollbarSize(true)}px`;

    it('should not adjust style when container element height is greater', () => {
      const menuListActionsRef = React.createRef();
      const listRef = React.createRef();
      mount(
        <React.Fragment>
          <MenuList ref={listRef} actions={menuListActionsRef} />
        </React.Fragment>,
      );
      const list = listRef.current;
      assert.strictEqual(list.style.paddingRight, '');
      assert.strictEqual(list.style.paddingLeft, '');
      assert.strictEqual(list.style.width, '');
      menuListActionsRef.current.adjustStyleForScrollbar(
        { clientHeight: 20 },
        { direction: 'ltr' },
      );
      assert.strictEqual(list.style.paddingRight, '');
      assert.strictEqual(list.style.paddingLeft, '');
      assert.strictEqual(list.style.width, '');
    });

    it('should adjust style when container element height is less', () => {
      const menuListActionsRef = React.createRef();
      const listRef = React.createRef();
      mount(
        <React.Fragment>
          <MenuList ref={listRef} actions={menuListActionsRef} />
        </React.Fragment>,
      );
      const list = listRef.current;
      setStyleWidthForJsdomOrBrowser(list.style, '');
      stub(list, 'clientHeight').get(() => 11);
      assert.strictEqual(list.style.paddingRight, '');
      assert.strictEqual(list.style.paddingLeft, '');
      assert.strictEqual(list.style.width, '');
      menuListActionsRef.current.adjustStyleForScrollbar(
        { clientHeight: 10 },
        { direction: 'ltr' },
      );
      assert.strictEqual(list.style.paddingRight, expectedPadding);
      assert.strictEqual(list.style.paddingLeft, '');
      assert.strictEqual(list.style.width, `calc(100% + ${expectedPadding})`);
    });

    it('should adjust paddingLeft when direction=rtl', () => {
      const menuListActionsRef = React.createRef();
      const listRef = React.createRef();
      mount(
        <React.Fragment>
          <MenuList ref={listRef} actions={menuListActionsRef} />
        </React.Fragment>,
      );
      const list = listRef.current;
      setStyleWidthForJsdomOrBrowser(list.style, '');
      stub(list, 'clientHeight').get(() => 11);
      assert.strictEqual(list.style.paddingRight, '');
      assert.strictEqual(list.style.paddingLeft, '');
      assert.strictEqual(list.style.width, '');
      menuListActionsRef.current.adjustStyleForScrollbar(
        { clientHeight: 10 },
        { direction: 'rtl' },
      );
      assert.strictEqual(list.style.paddingRight, '');
      assert.strictEqual(list.style.paddingLeft, expectedPadding);
      assert.strictEqual(list.style.width, `calc(100% + ${expectedPadding})`);
    });

    it('should not adjust styles when width already specified', () => {
      const menuListActionsRef = React.createRef();
      const listRef = React.createRef();
      mount(
        <React.Fragment>
          <MenuList ref={listRef} actions={menuListActionsRef} />
        </React.Fragment>,
      );
      const list = listRef.current;
      setStyleWidthForJsdomOrBrowser(list.style, '10px');
      Object.defineProperty(list, 'clientHeight', { value: 11 });
      assert.strictEqual(list.style.paddingRight, '');
      assert.strictEqual(list.style.paddingLeft, '');
      assert.strictEqual(list.style.width, '10px');
      menuListActionsRef.current.adjustStyleForScrollbar(
        { clientHeight: 10 },
        { direction: 'rtl' },
      );
      assert.strictEqual(list.style.paddingRight, '');
      assert.strictEqual(list.style.paddingLeft, '');
      assert.strictEqual(list.style.width, '10px');
    });
  });
});
