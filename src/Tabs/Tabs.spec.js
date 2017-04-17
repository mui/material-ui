// @flow weak

import React from 'react';
import { assert } from 'chai';
import EventListener from 'react-event-listener';
import { spy } from 'sinon';
import ScrollbarSize from 'react-scrollbar-size';
import scroll from 'scroll';
import { createShallow, createMount } from 'src/test-utils';
import Tabs, { styleSheet } from './Tabs';
import Tab from './Tab';
import TabScrollButton from './TabScrollButton';

const noop = () => {};

describe('<Tabs />', () => {
  let shallowWithWidth;
  let mount;
  let classes;

  before(() => {
    const shallow = createShallow();
    shallowWithWidth = (node, options = {}) => shallow(node, options).dive().dive();
    classes = shallow.context.styleManager.render(styleSheet);
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render with the root class', () => {
    const wrapper = shallowWithWidth(
      <Tabs width="md" onChange={noop}>
        <Tab />
      </Tabs>,
    );
    assert.strictEqual(wrapper.is('div'), true, 'should be a div');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  describe('prop: className', () => {
    it('should render with the user and root classes', () => {
      const wrapper = shallowWithWidth(
        <Tabs width="md" onChange={noop} className="woof">
          <Tab />
        </Tabs>,
      );
      assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
      assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    });
  });

  describe('prop: centered', () => {
    it('should render with the centered class', () => {
      const wrapper = shallowWithWidth(
        <Tabs width="md" onChange={noop} centered>
          <Tab />
        </Tabs>,
      );
      const selector = `.${classes.flexContainer}.${classes.centered}`;
      assert.strictEqual(wrapper.find(selector).is('div'), true, 'should be a div');
      assert.lengthOf(wrapper.find(selector), 1, 'should only be one');
    });
  });

  describe('prop: index', () => {
    let wrapper;
    before(() => {
      wrapper = shallowWithWidth(
        <Tabs width="md" onChange={noop} index={1}>
          <Tab />
          <Tab />
        </Tabs>,
      );
    });

    it('should pass selected prop to children', () => {
      assert.strictEqual(wrapper.find(Tab).at(0).props().selected, false,
        'should have selected to false');
      assert.strictEqual(wrapper.find(Tab).at(1).props().selected, true, 'should have selected');
    });

    it('should switch from the original index', () => {
      wrapper.setProps({ index: 0 });
      assert.strictEqual(wrapper.find(Tab).at(0).props().selected, true,
        'should have switched to true');
      assert.strictEqual(wrapper.find(Tab).at(1).props().selected, false,
        'should have switched to false');
    });
  });

  describe('prop: onChange', () => {
    it('should pass selected prop to children', () => {
      const handleChange = spy();
      const wrapper = mount(
        <Tabs width="md" index={0} onChange={handleChange}>
          <Tab />
          <Tab />
        </Tabs>,
      );
      wrapper.find(Tab).at(1).simulate('click');
      assert.strictEqual(handleChange.callCount, 1, 'should have been called once');
      assert.strictEqual(handleChange.args[0][1], 1, 'should have been called with index 1');
    });
  });

  describe('prop: scrollable', () => {
    let wrapper;
    before(() => {
      wrapper = shallowWithWidth(
        <Tabs
          width="md"
          onChange={noop}
          index={0}
          scrollable
        >
          <Tab />
        </Tabs>,
      );
    });
    it('should render with the scrollable class', () => {
      const selector = `.${classes.scrollingContainer}.${classes.scrollable}`;
      assert.strictEqual(wrapper.find(selector).is('div'), true, 'should be a div');
      assert.lengthOf(wrapper.find(selector), 1, 'should only be one');
    });

    it('should get a scrollbar size listener', () => {
      assert.lengthOf(wrapper.find(ScrollbarSize), 1, 'should be one');
    });

    it('should call updateScrollButtonState', () => {
      const instance = wrapper.instance();
      instance.tabs = { scrollLeft: 100 };
      const scrollSpy = spy(instance, 'updateScrollButtonState');
      const selector = `.${classes.scrollingContainer}.${classes.scrollable}`;
      wrapper.find(selector).simulate('scroll');
      assert.strictEqual(scrollSpy.called, true, 'should have called updateScrollButtonState');
    });

    it('should get a scrollbar size listener', () => {
      const mountWrapper = mount(
        <Tabs
          width="md"
          onChange={noop}
          index={0}
          scrollable
        >
          <Tab />
        </Tabs>,
      );
      assert.lengthOf(mountWrapper.find(ScrollbarSize), 1, 'should be one');
    });
  });

  describe('prop: !scrollable', () => {
    it('should not render with the scrollable class', () => {
      const wrapper = shallowWithWidth(
        <Tabs width="md" onChange={noop} index={0}>
          <Tab />
        </Tabs>,
      );
      const baseSelector = `.${classes.scrollingContainer}`;
      const selector = `.${classes.scrollingContainer}.${classes.scrollable}`;
      assert.lengthOf(wrapper.find(baseSelector), 1, 'base selector should exist');
      assert.lengthOf(wrapper.find(selector), 0, 'scrolling selector should not exist');
    });
  });

  describe('prop: scrollButtons', () => {
    it('should render scroll buttons', () => {
      const wrapper = shallowWithWidth(
        <Tabs
          width="md"
          onChange={noop}
          index={0}
          scrollable
          scrollButtons="on"
        >
          <Tab />
        </Tabs>,
      );
      assert.lengthOf(wrapper.find(TabScrollButton), 2, 'should be two');
    });

    it('should render scroll buttons automatically', () => {
      const wrapper = shallowWithWidth(
        <Tabs
          width="md"
          onChange={noop}
          scrollable
          scrollButtons="auto"
        >
          <Tab />
        </Tabs>,
      );
      assert.lengthOf(wrapper.find(TabScrollButton), 2, 'should be two');
    });

    it('should should not render scroll buttons automatically', () => {
      const wrapper = shallowWithWidth(
        <Tabs
          width="sm"
          onChange={noop}
          scrollable
          scrollButtons="auto"
        >
          <Tab />
        </Tabs>,
      );
      assert.lengthOf(wrapper.find(TabScrollButton), 0, 'should be zero');
    });

    it('should handle window resize event', () => {
      const wrapper = shallowWithWidth(
        <Tabs
          width="md"
          onChange={noop}
          index={0}
          scrollable
          scrollButtons="on"
        >
          <Tab />
        </Tabs>,
      );
      const instance = wrapper.instance();
      const resizeSpy = spy();
      instance.updateScrollButtonState = resizeSpy;
      wrapper.find(EventListener).at(0).simulate('resize');
      assert.strictEqual(resizeSpy.called, true, 'should have called updateScrollButtonState');
    });
  });

  describe('scroll button behavior', () => {
    let instance;
    let wrapper;
    let scrollSpy;
    const dimensions = {
      scrollLeft: 100,
      clientWidth: 200,
      scrollWidth: 1000,
    };
    before(() => {
      wrapper = shallowWithWidth(
        <Tabs
          width="md"
          onChange={noop}
          index={0}
          scrollable
          scrollButtons={'on'}
        >
          <Tab />
        </Tabs>,
      );
      instance = wrapper.instance();
      instance.tabs = dimensions;
      scrollSpy = spy(instance, 'moveTabsScroll');
    });

    it('should have changed the button display state', () => {
      instance.updateScrollButtonState();
      assert.strictEqual(wrapper.state('showLeftScroll'), true, 'should be true');
      assert.strictEqual(wrapper.state('showRightScroll'), true, 'should be true');
    });

    it('should call moveTabsScroll', () => {
      wrapper.find(TabScrollButton).at(0).simulate('click');
      assert.strictEqual(scrollSpy.args[0][0], -dimensions.clientWidth,
        `should be called with -${dimensions.clientWidth}`);
      wrapper.find(TabScrollButton).at(1).simulate('click');
      assert.strictEqual(scrollSpy.args[1][0], dimensions.clientWidth,
        `should be called with ${dimensions.clientWidth}`);
    });
  });

  describe('scroll into view behavior', () => {
    let scrollSpy;
    let instance;
    before(() => {
      scroll.left = () => {};
      scrollSpy = spy(scroll, 'left');
      const wrapper = shallowWithWidth(
        <Tabs
          width="md"
          onChange={noop}
          index={0}
          scrollable
        >
          <Tab />
        </Tabs>,
      );
      instance = wrapper.instance();
    });

    it('should scroll left tab into view', () => {
      const tabsMeta = {
        left: 0,
        right: 100,
        scrollLeft: 10,
      };

      const tabMeta = {
        left: -10,
        right: 10,
      };

      instance.scrollSelectedIntoView(tabsMeta, tabMeta);
      assert.strictEqual(scrollSpy.args[0][1], 0, 'should scroll to 0 position');
    });

    it('should scroll right tab into view', () => {
      const tabsMeta = {
        left: 0,
        right: 100,
        scrollLeft: 0,
      };

      const tabMeta = {
        left: 90,
        right: 110,
      };

      instance.scrollSelectedIntoView(tabsMeta, tabMeta);
      assert.strictEqual(scrollSpy.args[1][1], 10, 'should scroll to 10 position');
    });
  });
});
