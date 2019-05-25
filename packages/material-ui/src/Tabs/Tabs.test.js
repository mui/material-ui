import React from 'react';
import { assert } from 'chai';
import { spy, stub, useFakeTimers } from 'sinon';
import * as PropTypes from 'prop-types';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import {
  createMount,
  createRender,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import Tab from '../Tab';
import Tabs from './Tabs';
import TabScrollButton from './TabScrollButton';
import TabIndicator from './TabIndicator';

function AccessibleTabScrollButton(props) {
  return <TabScrollButton data-direction={props.direction} {...props} />;
}
AccessibleTabScrollButton.propTypes = {
  direction: PropTypes.string.isRequired,
};

const findScrollButton = (wrapper, direction) => wrapper.find(`div[data-direction="${direction}"]`);
const hasLeftScrollButton = wrapper => findScrollButton(wrapper, 'left').exists();
const hasRightScrollButton = wrapper => findScrollButton(wrapper, 'right').exists();

describe('<Tabs />', () => {
  let mount;
  let classes;
  let render;
  const noop = () => {};
  const fakeTabs = {
    getBoundingClientRect: () => ({}),
    children: [
      {
        children: [
          {
            getBoundingClientRect: () => ({}),
          },
        ],
      },
    ],
  };
  const setFakeTabs = (wrapper, tabs) => {
    const instance = wrapper.find('Tabs').instance();
    instance.tabsRef = { ...tabs, ...fakeTabs };
    // fake componentDidUpdate
    instance.updateScrollButtonState();
    // rerender
    wrapper.update();
  };

  before(() => {
    classes = getClasses(<Tabs onChange={noop} value={0} />);
    // StrictModeViolation: uses ButtonBase
    mount = createMount({ strict: false });
    render = createRender();
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Tabs onChange={noop} value={0} />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
  }));

  describe('warnings', () => {
    before(() => {
      consoleErrorMock.spy();
    });

    after(() => {
      consoleErrorMock.reset();
    });

    it('should warn if the input is invalid', () => {
      mount(<Tabs onChange={noop} value={0} centered variant="scrollable" />);
      assert.match(
        consoleErrorMock.args()[0][0],
        /Material-UI: you can not use the `centered={true}` and `variant="scrollable"`/,
      );
    });
  });

  describe('prop: action', () => {
    it('should be able to access updateIndicator function', () => {
      let tabsActions = {};
      mount(
        <Tabs
          width="md"
          onChange={noop}
          value={0}
          className="woofTabs"
          action={actions => {
            tabsActions = actions;
          }}
        >
          <Tab />
          <Tab />
        </Tabs>,
      );

      assert.strictEqual(
        typeof tabsActions.updateIndicator === 'function',
        true,
        'Should be a function.',
      );
      tabsActions.updateIndicator();
    });
  });

  describe('prop: centered', () => {
    it('should render with the centered class', () => {
      const wrapper = mount(
        <Tabs width="md" onChange={noop} value={0} centered>
          <Tab />
          <Tab />
        </Tabs>,
      );
      const selector = `.${classes.flexContainer}.${classes.centered}`;
      assert.strictEqual(wrapper.find(selector).type(), 'div');
    });
  });

  describe('prop: children', () => {
    it('should accept a null child', () => {
      const wrapper = mount(
        <Tabs width="md" onChange={noop} value={0}>
          {null}
          <Tab />
        </Tabs>,
      );
      assert.strictEqual(wrapper.find(Tab).length, 1);
    });

    it('should support empty children', () => {
      mount(<Tabs width="md" onChange={noop} value={1} />);
    });
  });

  describe('prop: value', () => {
    const tabs = (
      <Tabs width="md" onChange={noop} value={1}>
        <Tab />
        <Tab />
      </Tabs>
    );

    it('should pass selected prop to children', () => {
      const wrapper = mount(tabs);
      const tabWrappers = wrapper.find('[role="tab"]').hostNodes();

      assert.isNotOk(tabWrappers.at(0).props()['aria-selected']);
      assert.isOk(tabWrappers.at(1).props()['aria-selected']);
    });

    it('should accept any value as selected tab value', () => {
      const tab0 = {};
      const tab1 = {};
      assert.notStrictEqual(tab0, tab1);
      const wrapper = mount(
        <Tabs width="md" onChange={noop} value={tab0}>
          <Tab value={tab0} />
          <Tab value={tab1} />
        </Tabs>,
      );
      const tabWrappers = wrapper.find('[role="tab"]').hostNodes();

      assert.isOk(tabWrappers.at(0).props()['aria-selected']);
      assert.isNotOk(tabWrappers.at(1).props()['aria-selected']);
    });

    it('should switch from the original value', () => {
      const wrapper = mount(tabs);
      wrapper.setProps({ value: 0 });

      const tabWrappers = wrapper.find('[role="tab"]').hostNodes();

      assert.isOk(tabWrappers.at(0).props()['aria-selected']);
      assert.isNotOk(tabWrappers.at(1).props()['aria-selected']);
    });

    describe('indicator', () => {
      it('should accept a false value', () => {
        const wrapper = mount(
          <Tabs width="md" onChange={noop} value={false}>
            <Tab />
            <Tab />
          </Tabs>,
        );
        assert.strictEqual(wrapper.find(TabIndicator).props().style.width, 0);
      });

      it('should let the selected <Tab /> render the indicator server-side', () => {
        const markup = render(
          <Tabs width="md" onChange={noop} value={1}>
            <Tab />
            <Tab />
          </Tabs>,
        );
        const indicator = markup.find(`button > .${classes.indicator}`);
        assert.strictEqual(indicator.length, 1);
      });

      it('should render the indicator', () => {
        const wrapper = mount(
          <Tabs width="md" onChange={noop} value={1}>
            <Tab />
            <Tab />
          </Tabs>,
        );
        assert.strictEqual(
          wrapper
            .find(Tab)
            .at(0)
            .props().indicator,
          false,
        );
        assert.strictEqual(
          wrapper
            .find(Tab)
            .at(1)
            .props().indicator,
          false,
        );
        assert.strictEqual(wrapper.find(TabIndicator).length, 1);
      });

      it('should update the indicator state no matter what', () => {
        const wrapper = mount(
          <Tabs width="md" onChange={noop} value={1}>
            <Tab />
            <Tab />
          </Tabs>,
        );
        const tabsWrapper = wrapper.find('Tabs');
        const instance = tabsWrapper.instance();
        stub(instance, 'scrollSelectedIntoView');

        tabsWrapper.setState({
          indicatorStyle: {
            left: 10,
            width: 40,
          },
        });
        wrapper.setProps({
          value: 0,
        });

        assert.strictEqual(
          instance.scrollSelectedIntoView.callCount >= 2,
          true,
          'should have called scrollSelectedIntoView',
        );
      });
    });

    describe('warnings', () => {
      beforeEach(() => {
        consoleErrorMock.spy();
      });

      afterEach(() => {
        consoleErrorMock.reset();
      });

      it('warns when the value is not present in any tab', () => {
        mount(
          <Tabs width="md" onChange={noop} value={2}>
            <Tab value={1} />
            <Tab value={3} />
          </Tabs>,
        );
        assert.strictEqual(consoleErrorMock.callCount(), 3);
        assert.match(
          consoleErrorMock.args()[0][0],
          /You can provide one of the following values: 1, 3/,
        );
      });
    });
  });

  describe('prop: onChange', () => {
    it('should call onChange when clicking', () => {
      const handleChange = spy();
      // use mount to ensure that click event on Tab can be fired
      const wrapper = mount(
        <Tabs width="md" value={0} onChange={handleChange}>
          <Tab />
          <Tab />
        </Tabs>,
      );

      wrapper
        .find(Tab)
        .at(1)
        .simulate('click');
      wrapper.setProps({ value: 1 });

      assert.strictEqual(handleChange.callCount, 1, 'should have been called once');
      assert.strictEqual(handleChange.args[0][1], 1, 'should have been called with value 1');
    });
  });

  describe('prop: variant="scrollable"', () => {
    let clock;
    const tabs = (
      <Tabs width="md" onChange={noop} value={0} variant="scrollable">
        <Tab />
        <Tab />
      </Tabs>
    );

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('should render with the scrollable class', () => {
      const wrapper = mount(tabs);
      const selector = `.${classes.scroller}.${classes.scrollable}`;
      assert.strictEqual(wrapper.find(selector).name(), 'div');
      assert.strictEqual(wrapper.find(selector).length, 1);
    });

    it('should response to scroll events', () => {
      const wrapper = mount(tabs);
      const instance = wrapper.find('Tabs').instance();
      instance.tabsRef = { scrollLeft: 100, ...fakeTabs };
      spy(instance, 'updateScrollButtonState');

      const selector = `.${classes.scroller}.${classes.scrollable}`;
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
      const wrapper = mount(
        <Tabs width="md" onChange={noop} value={0} variant="scrollable">
          <Tab />
          <Tab />
        </Tabs>,
      );
      assert.strictEqual(wrapper.find('ScrollbarSize').length, 1);
    });
  });

  describe('prop: !variant="scrollable"', () => {
    it('should not render with the scrollable class', () => {
      const wrapper = mount(
        <Tabs width="md" onChange={noop} value={0}>
          <Tab />
          <Tab />
        </Tabs>,
      );
      const baseSelector = `.${classes.scroller}`;
      const selector = `.${classes.scroller}.${classes.scrollable}`;
      assert.strictEqual(wrapper.find(baseSelector).length, 1);
      assert.strictEqual(wrapper.find(selector).length, 0);
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
      const wrapper = mount(
        <Tabs width="md" onChange={noop} value={0} variant="scrollable" scrollButtons="on">
          <Tab />
          <Tab />
        </Tabs>,
      );
      assert.strictEqual(wrapper.find(TabScrollButton).length, 2, 'should be two');
    });

    it('should render scroll buttons automatically', () => {
      const wrapper = mount(
        <Tabs width="md" onChange={noop} value={0} variant="scrollable" scrollButtons="desktop">
          <Tab />
          <Tab />
        </Tabs>,
      );
      assert.strictEqual(wrapper.find(TabScrollButton).length, 2);
      assert.strictEqual(
        wrapper
          .find(TabScrollButton)
          .everyWhere(node => node.hasClass(classes.scrollButtonsDesktop)),
        true,
      );
    });

    it('should handle window resize event', () => {
      const wrapper = mount(
        <Tabs width="md" onChange={noop} value={0} variant="scrollable" scrollButtons="on">
          <Tab />
          <Tab />
        </Tabs>,
      );
      const instance = wrapper.find('Tabs').instance();
      stub(instance, 'updateScrollButtonState');
      stub(instance, 'updateIndicatorState');

      window.dispatchEvent(new window.Event('resize', {}));
      clock.tick(166);

      assert.strictEqual(instance.updateScrollButtonState.called, true);
      assert.strictEqual(instance.updateIndicatorState.called, true);
    });

    describe('scroll button visibility states', () => {
      const tabs = (
        <Tabs
          width="md"
          onChange={noop}
          value={0}
          variant="scrollable"
          scrollButtons="on"
          ScrollButtonComponent={AccessibleTabScrollButton}
        >
          <Tab />
          <Tab />
        </Tabs>
      );

      it('should set neither left nor right scroll button state', () => {
        const wrapper = mount(tabs);
        const instanceWrapper = wrapper.find('Tabs');
        const instance = instanceWrapper.instance();

        instance.tabsRef = {
          scrollLeft: 0,
          scrollWidth: 90,
          clientWidth: 100,
          ...fakeTabs,
        };
        instance.updateScrollButtonState();
        wrapper.update();

        assert.strictEqual(hasLeftScrollButton(wrapper), false);
        assert.strictEqual(hasRightScrollButton(wrapper), false);
      });

      it('should set only left scroll button state', () => {
        const wrapper = mount(tabs);

        setFakeTabs(wrapper, { scrollLeft: 2 });

        assert.strictEqual(hasLeftScrollButton(wrapper), true);
        assert.strictEqual(hasRightScrollButton(wrapper), false);
      });

      it('should set only right scroll button state', () => {
        const wrapper = mount(tabs);

        setFakeTabs(wrapper, {
          scrollLeft: 0,
          scrollWidth: 110,
          clientWidth: 100,
        });

        assert.strictEqual(hasLeftScrollButton(wrapper), false);
        assert.strictEqual(hasRightScrollButton(wrapper), true);
      });

      it('should set both left and right scroll button state', () => {
        const wrapper = mount(tabs);

        setFakeTabs(wrapper, {
          scrollLeft: 2,
          scrollWidth: 110,
          clientWidth: 100,
        });

        assert.strictEqual(hasLeftScrollButton(wrapper), true);
        assert.strictEqual(hasRightScrollButton(wrapper), true);
      });

      it('should not set scroll button states if difference is only one pixel', () => {
        const wrapper = mount(tabs);

        setFakeTabs(wrapper, {
          scrollLeft: 0,
          scrollWidth: 101,
          clientWidth: 100,
        });

        assert.strictEqual(hasLeftScrollButton(wrapper), false);
        assert.strictEqual(hasRightScrollButton(wrapper), false);
      });
    });
  });

  describe('scroll button behavior', () => {
    let instance;
    let wrapper;
    let scrollSpy;
    const dimensions = { scrollLeft: 100, clientWidth: 200, scrollWidth: 1000, ...fakeTabs };

    beforeEach(() => {
      wrapper = mount(
        <Tabs
          width="md"
          onChange={noop}
          value={0}
          variant="scrollable"
          scrollButtons="on"
          ScrollButtonComponent={AccessibleTabScrollButton}
        >
          <Tab />
          <Tab />
        </Tabs>,
      );
      instance = wrapper.find('Tabs').instance();

      setFakeTabs(wrapper, dimensions);

      scrollSpy = spy(instance, 'moveTabsScroll');
    });

    afterEach(() => {
      wrapper.detach();
    });

    it('should call moveTabsScroll', () => {
      findScrollButton(wrapper, 'left').simulate('click');
      assert.strictEqual(
        scrollSpy.args[0][0],
        -dimensions.clientWidth,
        `should be called with -${dimensions.clientWidth}`,
      );

      findScrollButton(wrapper, 'right').simulate('click');
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
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <Tabs width="md" onChange={noop} value={0} variant="scrollable">
          <Tab />
          <Tab />
        </Tabs>,
      );
      instance = wrapper.find('Tabs').instance();
      scrollStub = stub(instance, 'scroll');
      metaStub = stub(instance, 'getTabsMeta');
    });

    afterEach(() => {
      wrapper.detach();
    });

    it('should scroll left tab into view', () => {
      metaStub.returns({
        tabsMeta: { left: 0, right: 100, scrollLeft: 10 },
        tabMeta: { left: -10, right: 10 },
      });

      instance.scrollSelectedIntoView();
      assert.strictEqual(scrollStub.args[0][0], 0);
    });

    it('should scroll right tab into view', () => {
      metaStub.returns({
        tabsMeta: { left: 0, right: 100, scrollLeft: 0 },
        tabMeta: { left: 90, right: 110 },
      });

      instance.scrollSelectedIntoView();
      assert.strictEqual(scrollStub.args[0][0], 10);
    });

    it('should support value=false', () => {
      metaStub.returns({
        tabsMeta: { left: 0, right: 100, scrollLeft: 0 },
        tabMeta: undefined,
      });

      instance.scrollSelectedIntoView();
      assert.strictEqual(scrollStub.callCount, 0);
    });
  });

  describe('prop: TabIndicatorProps', () => {
    it('should merge the style', () => {
      const wrapper = mount(
        <Tabs onChange={noop} value={0} TabIndicatorProps={{ style: { backgroundColor: 'green' } }}>
          <Tab />
        </Tabs>,
      );
      assert.strictEqual(wrapper.find(TabIndicator).props().style.backgroundColor, 'green');
    });
  });
});
