import React from 'react';
import { expect, assert } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import * as PropTypes from 'prop-types';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import { createMount, createRender, getClasses } from '@material-ui/core/test-utils';
import { cleanup, createClientRender, fireEvent } from 'test/utils/createClientRender';
import describeConformance from '../test-utils/describeConformance';
import Tab from '../Tab';
import Tabs from './Tabs';
import TabScrollButton from './TabScrollButton';

function AccessibleTabScrollButton(props) {
  return <TabScrollButton data-direction={props.direction} {...props} />;
}
AccessibleTabScrollButton.propTypes = {
  direction: PropTypes.string.isRequired,
};

const findScrollButton = (container, direction) =>
  container.querySelector(`div[data-direction="${direction}"]`);
const hasLeftScrollButton = container => findScrollButton(container, 'left') != null;
const hasRightScrollButton = container => findScrollButton(container, 'right') != null;

describe('<Tabs />', () => {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  // The test fails on Safari with just:
  //
  // container.scrollLeft = 200;
  // assert.strictEqual(container.scrollLeft, 200); 💥
  if (isSafari) {
    return;
  }

  let mount;
  let classes;
  const render = createClientRender({ strict: true });
  let serverRender;

  before(() => {
    classes = getClasses(<Tabs value={0} />);
    mount = createMount({ strict: true });
    serverRender = createRender();
  });

  after(() => {
    cleanup();
  });

  describeConformance(<Tabs value={0} />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    after: () => mount.cleanUp(),
  }));

  describe('warnings', () => {
    before(() => {
      consoleErrorMock.spy();
    });

    after(() => {
      consoleErrorMock.reset();
    });

    it('should warn if the input is invalid', () => {
      render(<Tabs value={0} centered variant="scrollable" />);
      assert.match(
        consoleErrorMock.args()[0][0],
        /Material-UI: you can not use the `centered={true}` and `variant="scrollable"`/,
      );
    });
  });

  describe('prop: action', () => {
    it('should be able to access updateIndicator function', () => {
      let tabsActions = {};
      render(
        <Tabs
          value={0}
          action={actions => {
            tabsActions = actions;
          }}
        >
          <Tab />
          <Tab />
        </Tabs>,
      );

      expect(typeof tabsActions.updateIndicator).to.equal('function');
      tabsActions.updateIndicator();
    });
  });

  describe('prop: centered', () => {
    it('should render with the centered class', () => {
      const { container } = render(
        <Tabs value={0} centered>
          <Tab />
          <Tab />
        </Tabs>,
      );
      const selector = `.${classes.flexContainer}.${classes.centered}`;
      expect(container.querySelector(selector).nodeName).to.equal('DIV');
    });
  });

  describe('prop: children', () => {
    it('should accept a null child', () => {
      const { getAllByRole } = render(
        <Tabs value={0}>
          {null}
          <Tab />
        </Tabs>,
      );
      expect(getAllByRole('tab')).to.have.lengthOf(1);
    });

    it('should support empty children', () => {
      render(<Tabs value={1} />);
    });
  });

  describe('prop: value', () => {
    const tabs = (
      <Tabs value={1}>
        <Tab />
        <Tab />
      </Tabs>
    );

    it('should pass selected prop to children', () => {
      const { getAllByRole } = render(tabs);
      const tabElements = getAllByRole('tab');
      expect(tabElements[0]).to.have.attribute('aria-selected', 'false');
      expect(tabElements[1]).to.have.attribute('aria-selected', 'true');
    });

    it('should accept any value as selected tab value', () => {
      const tab0 = {};
      const tab1 = {};
      expect(tab0).to.not.equal(tab1);

      const { getAllByRole } = render(
        <Tabs value={tab0}>
          <Tab value={tab0} />
          <Tab value={tab1} />
        </Tabs>,
      );
      const tabElements = getAllByRole('tab');
      expect(tabElements[0]).to.have.attribute('aria-selected', 'true');
      expect(tabElements[1]).to.have.attribute('aria-selected', 'false');
    });

    describe('indicator', () => {
      it('should accept a false value', () => {
        const { container } = render(
          <Tabs value={false}>
            <Tab />
            <Tab />
          </Tabs>,
        );
        expect(container.querySelector(`.${classes.indicator}`).style.width).to.equal('0px');
      });

      it('should let the selected <Tab /> render the indicator server-side', () => {
        const markup = serverRender(
          <Tabs value={1}>
            <Tab />
            <Tab />
          </Tabs>,
        );
        const indicator = markup.find(`button > .${classes.indicator}`);
        expect(indicator).to.have.lengthOf(1);
      });

      it('should render the indicator', () => {
        const { container, getAllByRole } = render(
          <Tabs value={1}>
            <Tab />
            <Tab />
          </Tabs>,
        );
        const tabElements = getAllByRole('tab');
        expect(tabElements[0].querySelector(`.${classes.indicator}`)).to.not.be.ok;
        expect(tabElements[1].querySelector(`.${classes.indicator}`)).to.not.be.ok;
        expect(container.querySelector(`.${classes.indicator}`)).to.be.ok;
      });

      it('should update the indicator at each render', () => {
        const { setProps, container, getByRole } = render(
          <Tabs value={1}>
            <Tab />
            <Tab />
          </Tabs>,
        );
        const tablistContainer = getByRole('tablist').parentNode;
        const tab = getByRole('tablist').children[1];

        Object.defineProperty(tablistContainer, 'clientWidth', { value: 100 });
        Object.defineProperty(tablistContainer, 'scrollWidth', { value: 100 });
        tablistContainer.getBoundingClientRect = () => ({
          left: 0,
          right: 100,
        });
        tab.getBoundingClientRect = () => ({
          left: 50,
          width: 50,
          right: 100,
        });
        setProps();
        let style;
        style = container.querySelector(`.${classes.indicator}`).style;
        expect(style.left).to.equal('50px');
        expect(style.width).to.equal('50px');
        tab.getBoundingClientRect = () => ({
          left: 60,
          width: 50,
          right: 110,
        });
        setProps();
        style = container.querySelector(`.${classes.indicator}`).style;
        expect(style.left).to.equal('60px');
        expect(style.width).to.equal('50px');
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
        render(
          <Tabs value={2}>
            <Tab value={1} />
            <Tab value={3} />
          </Tabs>,
        );
        expect(consoleErrorMock.callCount()).to.equal(4);
        expect(consoleErrorMock.args()[0][0]).to.include(
          'You can provide one of the following values: 1, 3',
        );
      });
    });
  });

  describe('prop: onChange', () => {
    it('should call onChange when clicking', () => {
      const handleChange = spy();
      const { getAllByRole } = render(
        <Tabs value={0} onChange={handleChange}>
          <Tab />
          <Tab />
        </Tabs>,
      );

      fireEvent.click(getAllByRole('tab')[1]);
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal(1);
    });
  });

  describe('prop: variant="scrollable"', () => {
    let clock;
    const tabs = (
      <Tabs
        value={0}
        style={{ width: 200 }}
        variant="scrollable"
        ScrollButtonComponent={AccessibleTabScrollButton}
      >
        <Tab />
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
      const { container } = render(tabs);
      const selector = `.${classes.scroller}.${classes.scrollable}`;
      expect(container.querySelector(selector).tagName).to.equal('DIV');
      expect(container.querySelectorAll(selector)).to.have.lengthOf(1);
    });

    it('should response to scroll events', () => {
      const { container, setProps, getByRole } = render(tabs);
      const tablistContainer = getByRole('tablist').parentNode;

      Object.defineProperty(tablistContainer, 'clientWidth', { value: 120 });
      tablistContainer.scrollLeft = 10;
      Object.defineProperty(tablistContainer, 'scrollWidth', { value: 216 });
      Object.defineProperty(tablistContainer, 'getBoundingClientRect', {
        value: () => ({
          left: 0,
          right: 50,
        }),
      });
      setProps();
      clock.tick(1000);
      expect(hasLeftScrollButton(container)).to.equal(true);
      expect(hasRightScrollButton(container)).to.equal(true);
      tablistContainer.scrollLeft = 0;
      fireEvent.scroll(container.querySelector(`.${classes.scroller}.${classes.scrollable}`));
      clock.tick(166);

      expect(hasLeftScrollButton(container)).to.equal(false);
      expect(hasRightScrollButton(container)).to.equal(true);
    });

    it('should get a scrollbar size listener', () => {
      const { setProps, getByRole } = render(
        <Tabs value={0}>
          <Tab />
          <Tab />
        </Tabs>,
      );
      const tablistContainer = getByRole('tablist').parentNode;
      expect(tablistContainer.style.overflow).to.equal('hidden');
      setProps({
        variant: 'scrollable',
      });
      expect(tablistContainer.style.overflow).to.equal('');
    });
  });

  describe('prop: !variant="scrollable"', () => {
    it('should not render with the scrollable class', () => {
      const { container } = render(
        <Tabs value={0}>
          <Tab />
          <Tab />
        </Tabs>,
      );
      const baseSelector = `.${classes.scroller}`;
      const selector = `.${classes.scroller}.${classes.scrollable}`;
      expect(container.querySelector(baseSelector)).to.be.ok;
      expect(container.querySelector(selector)).to.not.be.ok;
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
      const { container } = render(
        <Tabs value={0} variant="scrollable" scrollButtons="on">
          <Tab />
          <Tab />
        </Tabs>,
      );
      expect(container.querySelectorAll(`.${classes.scrollButtons}`)).to.have.lengthOf(2);
    });

    it('should handle window resize event', () => {
      const { container, setProps, getByRole } = render(
        <Tabs
          value={0}
          variant="scrollable"
          scrollButtons="on"
          ScrollButtonComponent={AccessibleTabScrollButton}
          style={{ width: 200 }}
        >
          <Tab />
          <Tab />
          <Tab />
        </Tabs>,
      );

      const tablistContainer = getByRole('tablist').parentNode;

      Object.defineProperty(tablistContainer, 'clientWidth', { value: 120 });
      tablistContainer.scrollLeft = 10;
      Object.defineProperty(tablistContainer, 'scrollWidth', { value: 216 });
      Object.defineProperty(tablistContainer, 'getBoundingClientRect', {
        value: () => ({
          left: 0,
          right: 100,
        }),
      });
      setProps();
      clock.tick(1000);
      expect(hasLeftScrollButton(container)).to.equal(true);
      expect(hasRightScrollButton(container)).to.equal(true);
      tablistContainer.scrollLeft = 0;

      window.dispatchEvent(new window.Event('resize', {}));
      clock.tick(166);

      expect(hasLeftScrollButton(container)).to.equal(false);
      expect(hasRightScrollButton(container)).to.equal(true);
    });

    describe('scroll button visibility states', () => {
      it('should set neither left nor right scroll button state', () => {
        const { container, setProps, getByRole } = render(
          <Tabs
            value={0}
            variant="scrollable"
            scrollButtons="on"
            ScrollButtonComponent={AccessibleTabScrollButton}
            style={{ width: 200 }}
          >
            <Tab />
            <Tab />
          </Tabs>,
        );
        const tablistContainer = getByRole('tablist').parentNode;

        Object.defineProperty(tablistContainer, 'clientWidth', { value: 200 });
        Object.defineProperty(tablistContainer, 'scrollWidth', { value: 200 });

        setProps();
        expect(hasLeftScrollButton(container)).to.equal(false);
        expect(hasRightScrollButton(container)).to.equal(false);
      });

      it('should set only left scroll button state', () => {
        const { container, setProps, getByRole } = render(
          <Tabs
            value={0}
            variant="scrollable"
            scrollButtons="on"
            ScrollButtonComponent={AccessibleTabScrollButton}
            style={{ width: 200 }}
          >
            <Tab />
            <Tab />
            <Tab />
          </Tabs>,
        );
        const tablistContainer = getByRole('tablist').parentNode;

        Object.defineProperty(tablistContainer, 'clientWidth', { value: 120 });
        Object.defineProperty(tablistContainer, 'scrollWidth', { value: 216 });
        tablistContainer.scrollLeft = 96;

        setProps();
        expect(hasLeftScrollButton(container)).to.equal(true);
        expect(hasRightScrollButton(container)).to.equal(false);
      });

      it('should set only right scroll button state', () => {
        const { container, setProps, getByRole } = render(
          <Tabs
            value={0}
            variant="scrollable"
            scrollButtons="on"
            ScrollButtonComponent={AccessibleTabScrollButton}
            style={{ width: 200 }}
          >
            <Tab />
            <Tab />
            <Tab />
          </Tabs>,
        );
        const tablistContainer = getByRole('tablist').parentNode;

        Object.defineProperty(tablistContainer, 'clientWidth', { value: 120 });
        Object.defineProperty(tablistContainer, 'scrollWidth', { value: 216 });
        tablistContainer.scrollLeft = 0;

        setProps();
        expect(hasLeftScrollButton(container)).to.equal(false);
        expect(hasRightScrollButton(container)).to.equal(true);
      });

      it('should set both left and right scroll button state', () => {
        const { container, setProps, getByRole } = render(
          <Tabs
            value={0}
            variant="scrollable"
            scrollButtons="on"
            ScrollButtonComponent={AccessibleTabScrollButton}
            style={{ width: 200 }}
          >
            <Tab />
            <Tab />
          </Tabs>,
        );
        const tablistContainer = getByRole('tablist').parentNode;

        Object.defineProperty(tablistContainer, 'clientWidth', { value: 120 });
        Object.defineProperty(tablistContainer, 'scrollWidth', { value: 216 });
        tablistContainer.scrollLeft = 5;

        setProps();
        expect(hasLeftScrollButton(container)).to.equal(true);
        expect(hasRightScrollButton(container)).to.equal(true);
      });
    });
  });

  describe('scroll button behavior', () => {
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('should call moveTabsScroll', () => {
      const { container, setProps, getByRole } = render(
        <Tabs
          value={0}
          variant="scrollable"
          scrollButtons="on"
          ScrollButtonComponent={AccessibleTabScrollButton}
          style={{ width: 200 }}
        >
          <Tab />
          <Tab />
          <Tab />
        </Tabs>,
      );
      const tablistContainer = getByRole('tablist').parentNode;
      Object.defineProperty(tablistContainer, 'clientWidth', { value: 120 });
      Object.defineProperty(tablistContainer, 'scrollWidth', { value: 216 });
      tablistContainer.scrollLeft = 20;
      setProps();
      clock.tick(1000);
      expect(hasLeftScrollButton(container)).to.equal(true);
      expect(hasRightScrollButton(container)).to.equal(true);

      fireEvent.click(findScrollButton(container, 'left'));
      clock.tick(1000);
      expect(tablistContainer.scrollLeft).not.to.be.above(0);

      tablistContainer.scrollLeft = 0;
      fireEvent.click(findScrollButton(container, 'right'));
      clock.tick(1000);
      expect(tablistContainer.scrollLeft).not.to.be.below(
        tablistContainer.scrollWidth - tablistContainer.clientWidth,
      );
    });
  });

  describe('scroll into view behavior', () => {
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('should scroll left tab into view', () => {
      const { setProps, getByRole } = render(
        <Tabs value={0} variant="scrollable" style={{ width: 200 }}>
          <Tab />
          <Tab />
          <Tab />
        </Tabs>,
      );
      const tablistContainer = getByRole('tablist').parentNode;
      const tab = getByRole('tablist').children[0];

      Object.defineProperty(tablistContainer, 'clientWidth', { value: 120 });
      Object.defineProperty(tablistContainer, 'scrollWidth', { value: 216 });
      tablistContainer.scrollLeft = 20;
      tablistContainer.getBoundingClientRect = () => ({
        left: 0,
        right: 100,
      });
      tab.getBoundingClientRect = () => ({
        left: -20,
        width: 50,
        right: 30,
      });
      setProps();
      clock.tick(1000);
      expect(tablistContainer.scrollLeft).to.equal(0);
    });
  });

  describe('prop: TabIndicatorProps', () => {
    it('should merge the style', () => {
      const { container } = render(
        <Tabs value={0} TabIndicatorProps={{ style: { backgroundColor: 'green' } }}>
          <Tab />
        </Tabs>,
      );
      const style = container.querySelector(`.${classes.indicator}`).style;
      expect(style.backgroundColor).to.equal('green');
    });
  });

  describe('prop: orientation', () => {
    it('should support orientation="vertical"', () => {
      const { setProps, container, getByRole } = render(
        <Tabs value={1} variant="scrollable" scrollButtons="on" orientation="vertical">
          <Tab />
          <Tab />
        </Tabs>,
      );
      const tablistContainer = getByRole('tablist').parentNode;
      const tab = getByRole('tablist').children[1];

      Object.defineProperty(tablistContainer, 'clientHeight', { value: 100 });
      Object.defineProperty(tablistContainer, 'scrollHeight', { value: 100 });
      tablistContainer.getBoundingClientRect = () => ({
        top: 0,
        bottom: 100,
      });
      tab.getBoundingClientRect = () => ({
        top: 50,
        height: 50,
        bottom: 100,
      });
      setProps();
      let style;
      style = container.querySelector(`.${classes.indicator}`).style;
      expect(style.top).to.equal('50px');
      expect(style.height).to.equal('50px');
      tab.getBoundingClientRect = () => ({
        top: 60,
        height: 50,
        bottom: 110,
      });
      setProps();
      style = container.querySelector(`.${classes.indicator}`).style;
      expect(style.top).to.equal('60px');
      expect(style.height).to.equal('50px');
    });
  });
});
