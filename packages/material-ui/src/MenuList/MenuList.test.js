import React from 'react';
import { assert } from 'chai';
import { stub } from 'sinon';
import { createMount, createShallow, testRef } from '@material-ui/core/test-utils';
import MenuList from './MenuList';
import getScrollbarSize from '../utils/getScrollbarSize';

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
  let shallow;

  before(() => {
    mount = createMount();
    shallow = createShallow({ dive: true, disableLifecycleMethods: true });
  });

  after(() => {
    mount.cleanUp();
  });

  it('does forward refs', () => {
    testRef(<MenuList />, mount);
  });

  describe('list node', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(<MenuList className="test-class" data-test="hi" />);
    });

    it('should render a List', () => {
      assert.strictEqual(wrapper.props()['data-test'], 'hi');
      assert.strictEqual(wrapper.hasClass('test-class'), true);
    });
  });

  describe('prop: children', () => {
    it('should support invalid children', () => {
      const wrapper = shallow(
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
      const wrapper = mount(<MenuList actions={menuListActionsRef} />);
      const list = wrapper.getDOMNode();
      assert.strictEqual(list.style.paddingRight, '');
      assert.strictEqual(list.style.paddingLeft, '');
      assert.strictEqual(list.style.width, '');
      menuListActionsRef.current.adjustStyleForScrollbar(
        { clientHeight: 10 },
        { direction: 'ltr' },
      );
      assert.strictEqual(list.style.paddingRight, '');
      assert.strictEqual(list.style.paddingLeft, '');
      assert.strictEqual(list.style.width, '');
    });

    it('should adjust style when container element height is less', () => {
      const menuListActionsRef = React.createRef();
      const wrapper = mount(<MenuList actions={menuListActionsRef} />);
      const list = wrapper.getDOMNode();
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
      const wrapper = mount(<MenuList actions={menuListActionsRef} />);
      const list = wrapper.getDOMNode();
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
      const wrapper = mount(<MenuList actions={menuListActionsRef} />);
      const list = wrapper.getDOMNode();
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
