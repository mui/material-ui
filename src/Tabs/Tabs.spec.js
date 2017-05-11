// @flow

import React from 'react';
import { assert } from 'chai';
import { spy, stub } from 'sinon';
import scroll from 'scroll';
import { createShallow, createMount } from 'src/test-utils';
import Tabs, { styleSheet } from './Tabs';
import Tab from './Tab';

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
    assert.strictEqual(wrapper.name(), 'div');
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
    it('should call onChange when clicking', () => {
      const handleChange = spy();
      // use mount to ensure that click event on Tab can be fired
      const wrapper = mount(
        <Tabs width="md" index={0} onChange={handleChange}>
          <Tab />
          <Tab />
        </Tabs>,
      );
      wrapper.find(Tab).at(1).simulate('click');
      wrapper.setProps({ index: 1 });
      assert.strictEqual(handleChange.callCount, 1, 'should have been called once');
      assert.strictEqual(handleChange.args[0][1], 1, 'should have been called with index 1');
      wrapper.unmount();
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

    it('should response to scroll events', (done) => {
      const instance = wrapper.instance();
      instance.tabs = { scrollLeft: 100 };
      spy(instance, 'updateScrollButtonState');
      const selector = `.${classes.scrollingContainer}.${classes.scrollable}`;
      wrapper.find(selector).simulate('scroll');
      setTimeout(() => {
        assert.strictEqual(instance.updateScrollButtonState.called, true,
          'should have called updateScrollButtonState');
        done();
      }, 150);
    });

    it('should get a scrollbar size listener', () => {
      // use mount to ensure that handleScrollbarSizeChange gets covered
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
      assert.lengthOf(mountWrapper.find('ScrollbarSize'), 1, 'should be one');
      mountWrapper.unmount();
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
      assert.lengthOf(wrapper.find('TabScrollButton'), 2, 'should be two');
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
      assert.lengthOf(wrapper.find('TabScrollButton'), 2, 'should be two');
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
      assert.lengthOf(wrapper.find('TabScrollButton'), 0, 'should be zero');
    });

    it('should handle window resize event', (done) => {
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
      stub(instance, 'updateScrollButtonState');
      stub(instance, 'updateIndicatorState');
      wrapper.find('EventListener').at(0).simulate('resize');
      setTimeout(() => {
        assert.strictEqual(instance.updateScrollButtonState.called, true,
          'should have called updateScrollButtonState');
        assert.strictEqual(instance.updateIndicatorState.called, true,
          'should have called updateIndicatorState');
        done();
      }, 150);
    });

    describe('scroll button visibility states', () => {
      let wrapper; let instance;
      before(() => {
        wrapper = shallowWithWidth(
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
        instance = wrapper.instance();
      });

      it('should set neither left nor right scroll button state', () => {
        instance.tabs = {
          scrollLeft: 0,
          scrollWidth: 90,
          clientWidth: 100,
        };
        instance.updateScrollButtonState();
        assert.strictEqual(wrapper.state('showLeftScroll'), false, 'left scroll should be false');
        assert.strictEqual(wrapper.state('showRightScroll'), false, 'right scroll should be false');
      });

      it('should set only left scroll button state', () => {
        instance.tabs = {
          scrollLeft: 1,
        };
        instance.updateScrollButtonState();
        assert.strictEqual(wrapper.state('showLeftScroll'), true, 'left scroll should be true');
        assert.strictEqual(wrapper.state('showRightScroll'), false, 'right scroll should be false');
      });

      it('should set only right scroll button state', () => {
        instance.tabs = {
          scrollLeft: 0,
          scrollWidth: 110,
          clientWidth: 100,
        };
        instance.updateScrollButtonState();
        assert.strictEqual(wrapper.state('showLeftScroll'), false, 'left scroll should be false');
        assert.strictEqual(wrapper.state('showRightScroll'), true, 'right scroll should be true');
      });

      it('should set both left and right scroll button state', () => {
        instance.tabs = {
          scrollLeft: 1,
          scrollWidth: 110,
          clientWidth: 100,
        };
        instance.updateScrollButtonState();
        assert.strictEqual(wrapper.state('showLeftScroll'), true, 'left scroll should be true');
        assert.strictEqual(wrapper.state('showRightScroll'), true, 'right scroll should be true');
      });
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

    it('should call moveTabsScroll', () => {
      wrapper.find('TabScrollButton').at(0).simulate('click');
      assert.strictEqual(scrollSpy.args[0][0], -dimensions.clientWidth,
        `should be called with -${dimensions.clientWidth}`);
      wrapper.find('TabScrollButton').at(1).simulate('click');
      assert.strictEqual(scrollSpy.args[1][0], dimensions.clientWidth,
        `should be called with ${dimensions.clientWidth}`);
    });
  });

  describe('scroll into view behavior', () => {
    let scrollStub;
    let instance;
    let metaStub;

    before(() => {
      scrollStub = stub(scroll, 'left');
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
      metaStub = stub(instance, 'getTabsMeta');
    });

    after(() => {
      scroll.left.restore();
    });

    it('should scroll left tab into view', () => {
      metaStub.returns({
        tabsMeta: { left: 0, right: 100, scrollLeft: 10 },
        tabMeta: { left: -10, right: 10 },
      });

      instance.scrollSelectedIntoView();
      assert.strictEqual(scrollStub.args[0][1], 0, 'should scroll to 0 position');
    });

    it('should scroll right tab into view', () => {
      metaStub.returns({
        tabsMeta: { left: 0, right: 100, scrollLeft: 0 },
        tabMeta: { left: 90, right: 110 },
      });

      instance.scrollSelectedIntoView();
      assert.strictEqual(scrollStub.args[1][1], 10, 'should scroll to 10 position');
    });
  });
});
