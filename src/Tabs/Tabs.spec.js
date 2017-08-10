// @flow

import React from 'react';
import { assert } from 'chai';
import { spy, stub, useFakeTimers } from 'sinon';
import scroll from 'scroll';
import { createShallow, createMount, getClasses } from '../test-utils';
import consoleErrorMock from '../../test/utils/consoleErrorMock';
import Tabs, { styleSheet } from './Tabs';
import TabScrollButton from './TabScrollButton';
import TabIndicator from './TabIndicator';
import Tab from './Tab';

const noop = () => {};

describe('<Tabs />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ untilSelector: 'Tabs' });
    classes = getClasses(styleSheet);
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render with the root class', () => {
    const wrapper = shallow(
      <Tabs width="md" onChange={noop} index={0}>
        <Tab />
      </Tabs>,
    );
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  describe('prop: className', () => {
    it('should render with the user and root classes', () => {
      const wrapper = shallow(
        <Tabs width="md" onChange={noop} index={0} className="woofTabs">
          <Tab />
        </Tabs>,
      );
      assert.strictEqual(wrapper.hasClass('woofTabs'), true);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
    });
  });

  describe('prop: centered', () => {
    it('should render with the centered class', () => {
      const wrapper = shallow(
        <Tabs width="md" onChange={noop} index={0} centered>
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
      wrapper = shallow(
        <Tabs width="md" onChange={noop} index={1}>
          <Tab />
          <Tab />
        </Tabs>,
      );
    });

    after(() => {
      consoleErrorMock.reset();
    });

    it('should pass selected prop to children', () => {
      assert.strictEqual(
        wrapper.find(Tab).at(0).props().selected,
        false,
        'should have selected to false',
      );
      assert.strictEqual(wrapper.find(Tab).at(1).props().selected, true, 'should have selected');
    });

    it('should switch from the original index', () => {
      wrapper.setProps({ index: 0 });
      assert.strictEqual(
        wrapper.find(Tab).at(0).props().selected,
        true,
        'should have switched to true',
      );
      assert.strictEqual(
        wrapper.find(Tab).at(1).props().selected,
        false,
        'should have switched to false',
      );
    });

    it('should accept a false value', () => {
      const wrapper2 = mount(
        <Tabs width="md" onChange={noop} index={false}>
          <Tab />
          <Tab />
        </Tabs>,
      );
      assert.strictEqual(wrapper2.find(TabIndicator).props().style.width, 0);
    });

    it('should warn when the index is invalid', () => {
      consoleErrorMock.spy();
      mount(
        <Tabs width="md" onChange={noop} index={2}>
          <Tab />
          <Tab />
        </Tabs>,
      );
      assert.strictEqual(consoleErrorMock.callCount(), 2);
      assert.strictEqual(
        consoleErrorMock.args()[0][0],
        'Warning: Material-UI: the index provided `2` is invalid',
      );
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
    let clock;
    let wrapper;

    before(() => {
      clock = useFakeTimers();
      wrapper = shallow(
        <Tabs width="md" onChange={noop} index={0} scrollable>
          <Tab />
        </Tabs>,
      );
    });

    after(() => {
      clock.restore();
    });

    it('should render with the scrollable class', () => {
      const selector = `.${classes.scrollingContainer}.${classes.scrollable}`;
      assert.strictEqual(wrapper.find(selector).is('div'), true, 'should be a div');
      assert.lengthOf(wrapper.find(selector), 1, 'should only be one');
    });

    it('should response to scroll events', () => {
      const instance = wrapper.instance();
      instance.tabs = { scrollLeft: 100 };
      spy(instance, 'updateScrollButtonState');
      const selector = `.${classes.scrollingContainer}.${classes.scrollable}`;
      wrapper.find(selector).simulate('scroll');
      clock.tick(166);
      assert.strictEqual(
        instance.updateScrollButtonState.called,
        true,
        'should have called updateScrollButtonState',
      );
    });

    it('should get a scrollbar size listener', () => {
      // use mount to ensure that handleScrollbarSizeChange gets covered
      const mountWrapper = mount(
        <Tabs width="md" onChange={noop} index={0} scrollable>
          <Tab />
        </Tabs>,
      );
      assert.lengthOf(mountWrapper.find('ScrollbarSize'), 1, 'should be one');
      mountWrapper.unmount();
    });
  });

  describe('prop: !scrollable', () => {
    it('should not render with the scrollable class', () => {
      const wrapper = shallow(
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
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('should render scroll buttons', () => {
      const wrapper = shallow(
        <Tabs width="md" onChange={noop} index={0} scrollable scrollButtons="on">
          <Tab />
        </Tabs>,
      );
      assert.lengthOf(wrapper.find(TabScrollButton), 2, 'should be two');
    });

    it('should render scroll buttons automatically', () => {
      const wrapper = shallow(
        <Tabs width="md" onChange={noop} index={0} scrollable scrollButtons="auto">
          <Tab />
        </Tabs>,
      );
      assert.lengthOf(wrapper.find(TabScrollButton), 2, 'should be two');
    });

    it('should should not render scroll buttons automatically', () => {
      const wrapper = shallow(
        <Tabs width="sm" onChange={noop} index={0} scrollable scrollButtons="auto">
          <Tab />
        </Tabs>,
      );
      assert.lengthOf(wrapper.find(TabScrollButton), 0, 'should be zero');
    });

    it('should handle window resize event', () => {
      const wrapper = shallow(
        <Tabs width="md" onChange={noop} index={0} scrollable scrollButtons="on">
          <Tab />
        </Tabs>,
      );
      const instance = wrapper.instance();
      stub(instance, 'updateScrollButtonState');
      stub(instance, 'updateIndicatorState');
      wrapper.find('EventListener').at(0).simulate('resize');
      clock.tick(166);
      assert.strictEqual(
        instance.updateScrollButtonState.called,
        true,
        'should have called updateScrollButtonState',
      );
      assert.strictEqual(
        instance.updateIndicatorState.called,
        true,
        'should have called updateIndicatorState',
      );
    });

    describe('scroll button visibility states', () => {
      let wrapper;
      let instance;
      before(() => {
        wrapper = shallow(
          <Tabs width="md" onChange={noop} index={0} scrollable scrollButtons="on">
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
      wrapper = shallow(
        <Tabs width="md" onChange={noop} index={0} scrollable scrollButtons={'on'}>
          <Tab />
        </Tabs>,
      );
      instance = wrapper.instance();
      instance.tabs = dimensions;
      scrollSpy = spy(instance, 'moveTabsScroll');
    });

    it('should call moveTabsScroll', () => {
      wrapper.find(TabScrollButton).at(0).simulate('click');
      assert.strictEqual(
        scrollSpy.args[0][0],
        -dimensions.clientWidth,
        `should be called with -${dimensions.clientWidth}`,
      );
      wrapper.find(TabScrollButton).at(1).simulate('click');
      assert.strictEqual(
        scrollSpy.args[1][0],
        dimensions.clientWidth,
        `should be called with ${dimensions.clientWidth}`,
      );
    });
  });

  describe('scroll into view behavior', () => {
    let scrollStub;
    let instance;
    let metaStub;

    before(() => {
      scrollStub = stub(scroll, 'left');
      const wrapper = shallow(
        <Tabs width="md" onChange={noop} index={0} scrollable>
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
