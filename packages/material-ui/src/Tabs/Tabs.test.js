import * as React from 'react';
import { expect } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import { createClientRender, fireEvent, screen } from 'test/utils/createClientRender';
import createServerRender from 'test/utils/createServerRender';
import describeConformance from '../test-utils/describeConformance';
import capitalize from '../utils/capitalize';
import Tab from '../Tab';
import Tabs from './Tabs';
import { createMuiTheme, ThemeProvider } from '../styles';

function findScrollButton(container, direction) {
  return container.querySelector(`svg[data-mui-test="KeyboardArrow${capitalize(direction)}Icon"]`);
}

function hasLeftScrollButton(container) {
  const scrollButton = findScrollButton(container, 'left');

  if (!scrollButton) {
    return false;
  }

  return !scrollButton.parentElement.classList.contains('Mui-disabled');
}

function hasRightScrollButton(container) {
  const scrollButton = findScrollButton(container, 'right');

  if (!scrollButton) {
    return false;
  }

  return !scrollButton.parentElement.classList.contains('Mui-disabled');
}

describe('<Tabs />', () => {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  // tests mocking getBoundingClientRect prevent mocha to exit
  const isJSDOM = navigator.userAgent === 'node.js';

  // The test fails on Safari with just:
  //
  // container.scrollLeft = 200;
  // expect(container.scrollLeft).to.equal(200); 💥
  if (isSafari) {
    return;
  }

  const mount = createMount();
  let classes;
  const render = createClientRender();

  before(() => {
    classes = getClasses(<Tabs value={0} />);
  });

  describeConformance(<Tabs value={0} />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
  }));

  it('can be named via `aria-label`', () => {
    render(<Tabs aria-label="string label" />);

    expect(screen.getByRole('tablist')).toHaveAccessibleName('string label');
  });

  it('can be named via `aria-labelledby`', () => {
    render(
      <React.Fragment>
        <h3 id="label-id">complex name</h3>
        <Tabs aria-labelledby="label-id" />
      </React.Fragment>,
    );

    expect(screen.getByRole('tablist')).toHaveAccessibleName('complex name');
  });

  describe('warnings', () => {
    before(() => {
      consoleErrorMock.spy();
    });

    after(() => {
      consoleErrorMock.reset();
    });

    it('should warn if the input is invalid', () => {
      render(<Tabs value={0} centered variant="scrollable" />);
      expect(consoleErrorMock.messages()[0]).to.match(
        /Material-UI: You can not use the `centered={true}` and `variant="scrollable"`/,
      );
    });
  });

  describe('prop: action', () => {
    it('should be able to access updateIndicator function', () => {
      let tabsActions = {};
      render(
        <Tabs
          value={0}
          action={(actions) => {
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

    it('puts the selected child in tab order', () => {
      const { getAllByRole, setProps } = render(
        <Tabs value={1}>
          <Tab />
          <Tab />
        </Tabs>,
      );

      expect(getAllByRole('tab').map((tab) => tab.tabIndex)).to.have.ordered.members([-1, 0]);

      setProps({ value: 0 });

      expect(getAllByRole('tab').map((tab) => tab.tabIndex)).to.have.ordered.members([0, -1]);
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

      it('should render the indicator', () => {
        const { container, getAllByRole } = render(
          <Tabs value={1}>
            <Tab />
            <Tab />
          </Tabs>,
        );
        const tabElements = getAllByRole('tab');
        expect(tabElements[0].querySelector(`.${classes.indicator}`)).to.equal(null);
        expect(tabElements[1].querySelector(`.${classes.indicator}`)).to.equal(null);
        expect(container.querySelector(`.${classes.indicator}`)).not.to.equal(null);
      });

      it('should update the indicator at each render', function test() {
        if (isJSDOM) {
          this.skip();
        }

        const { setProps, container, getByRole } = render(
          <Tabs value={1}>
            <Tab />
            <Tab />
          </Tabs>,
        );
        const tablistContainer = getByRole('tablist').parentElement;
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
        expect(consoleErrorMock.messages()[0]).to.include(
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

    it('when `selectionFollowsFocus` should call if an unselected tab gets focused', () => {
      const handleChange = spy((event, value) => value);
      const { getAllByRole } = render(
        <Tabs value={0} onChange={handleChange} selectionFollowsFocus>
          <Tab />
          <Tab />
        </Tabs>,
      );
      const [, lastTab] = getAllByRole('tab');

      lastTab.focus();

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.firstCall.returnValue).to.equal(1);
    });

    it('when `selectionFollowsFocus` should not call if an selected tab gets focused', () => {
      const handleChange = spy();
      const { getAllByRole } = render(
        <Tabs value={0} onChange={handleChange} selectionFollowsFocus>
          <Tab />
          <Tab />
        </Tabs>,
      );
      const [firstTab] = getAllByRole('tab');

      firstTab.focus();

      expect(handleChange.callCount).to.equal(0);
    });
  });

  describe('prop: variant="scrollable"', () => {
    let clock;
    const tabs = (
      <Tabs value={0} style={{ width: 200 }} variant="scrollable">
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

    it('should response to scroll events', function test() {
      if (isJSDOM) {
        this.skip();
      }
      const { container, setProps, getByRole } = render(tabs);
      const tablistContainer = getByRole('tablist').parentElement;

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
      const tablistContainer = getByRole('tablist').parentElement;
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
      expect(container.querySelector(baseSelector)).not.to.equal(null);
      expect(container.querySelector(selector)).to.equal(null);
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

    it('should handle window resize event', function test() {
      if (isJSDOM) {
        this.skip();
      }

      const { container, setProps, getByRole } = render(
        <Tabs value={0} variant="scrollable" scrollButtons="on" style={{ width: 200 }}>
          <Tab />
          <Tab />
          <Tab />
        </Tabs>,
      );

      const tablistContainer = getByRole('tablist').parentElement;

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
          <Tabs value={0} variant="scrollable" scrollButtons="on" style={{ width: 200 }}>
            <Tab />
            <Tab />
          </Tabs>,
        );
        const tablistContainer = getByRole('tablist').parentElement;

        Object.defineProperty(tablistContainer, 'clientWidth', { value: 200 });
        Object.defineProperty(tablistContainer, 'scrollWidth', { value: 200 });

        setProps();
        expect(hasLeftScrollButton(container)).to.equal(false);
        expect(hasRightScrollButton(container)).to.equal(false);
      });

      it('should set only left scroll button state', () => {
        const { container, setProps, getByRole } = render(
          <Tabs value={0} variant="scrollable" scrollButtons="on" style={{ width: 200 }}>
            <Tab />
            <Tab />
            <Tab />
          </Tabs>,
        );
        const tablistContainer = getByRole('tablist').parentElement;

        Object.defineProperty(tablistContainer, 'clientWidth', { value: 120 });
        Object.defineProperty(tablistContainer, 'scrollWidth', { value: 216 });
        tablistContainer.scrollLeft = 96;

        setProps();
        expect(hasLeftScrollButton(container)).to.equal(true);
        expect(hasRightScrollButton(container)).to.equal(false);
      });

      it('should set only right scroll button state', () => {
        const { container, setProps, getByRole } = render(
          <Tabs value={0} variant="scrollable" scrollButtons="on" style={{ width: 200 }}>
            <Tab />
            <Tab />
            <Tab />
          </Tabs>,
        );
        const tablistContainer = getByRole('tablist').parentElement;

        Object.defineProperty(tablistContainer, 'clientWidth', { value: 120 });
        Object.defineProperty(tablistContainer, 'scrollWidth', { value: 216 });
        tablistContainer.scrollLeft = 0;

        setProps();
        expect(hasLeftScrollButton(container)).to.equal(false);
        expect(hasRightScrollButton(container)).to.equal(true);
      });

      it('should set both left and right scroll button state', () => {
        const { container, setProps, getByRole } = render(
          <Tabs value={0} variant="scrollable" scrollButtons="on" style={{ width: 200 }}>
            <Tab />
            <Tab />
          </Tabs>,
        );
        const tablistContainer = getByRole('tablist').parentElement;

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
        <Tabs value={0} variant="scrollable" scrollButtons="on" style={{ width: 200 }}>
          <Tab />
          <Tab />
          <Tab />
        </Tabs>,
      );
      const tablistContainer = getByRole('tablist').parentElement;
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

    it('should scroll left tab into view', function test() {
      if (isJSDOM) {
        this.skip();
      }

      const { setProps, getByRole } = render(
        <Tabs value={0} variant="scrollable" style={{ width: 200 }}>
          <Tab />
          <Tab />
          <Tab />
        </Tabs>,
      );
      const tablist = getByRole('tablist');
      const tablistContainer = tablist.parentElement;
      const tab = tablist.children[0];

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
    it('should support orientation="vertical"', function test() {
      if (isJSDOM) {
        this.skip();
      }

      const { setProps, container, getByRole } = render(
        <Tabs value={1} variant="scrollable" scrollButtons="on" orientation="vertical">
          <Tab />
          <Tab />
        </Tabs>,
      );
      const tablist = getByRole('tablist');
      const tablistContainer = tablist.parentElement;
      const tab = tablist.children[1];

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

  describe('server-side render', () => {
    const serverRender = createServerRender({ expectUseLayoutEffectWarning: true });

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
  });

  describe('keyboard navigation when focus is on a tab', () => {
    [
      ['horizontal', 'ltr', 'ArrowLeft', 'ArrowRight'],
      ['horizontal', 'rtl', 'ArrowRight', 'ArrowLeft'],
      ['vertical', undefined, 'ArrowUp', 'ArrowDown'],
    ].forEach((entry) => {
      const [orientation, direction, previousItemKey, nextItemKey] = entry;

      let wrapper;
      before(() => {
        const theme = createMuiTheme({ direction });
        wrapper = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;
      });

      describe(`when focus is on a tab element in a ${orientation} ${direction} tablist`, () => {
        describe(previousItemKey, () => {
          it('moves focus to the last tab without activating it if focus is on the first tab', () => {
            const handleChange = spy();
            const handleKeyDown = spy((event) => event.defaultPrevented);
            const { getAllByRole } = render(
              <Tabs
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation}
                value={1}
              >
                <Tab />
                <Tab />
                <Tab />
              </Tabs>,
              { wrapper },
            );
            const [firstTab, , lastTab] = getAllByRole('tab');
            firstTab.focus();

            fireEvent.keyDown(firstTab, { key: previousItemKey });

            expect(lastTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(0);
            expect(handleKeyDown.firstCall.returnValue).to.equal(true);
          });

          it('when `selectionFollowsFocus` moves focus to the last tab while activating it if focus is on the first tab', () => {
            const handleChange = spy((event, value) => value);
            const handleKeyDown = spy((event) => event.defaultPrevented);
            const { getAllByRole } = render(
              <Tabs
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation}
                selectionFollowsFocus
                value={0}
              >
                <Tab />
                <Tab />
                <Tab />
              </Tabs>,
              { wrapper },
            );
            const [firstTab, , lastTab] = getAllByRole('tab');
            firstTab.focus();

            fireEvent.keyDown(firstTab, { key: previousItemKey });

            expect(lastTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(1);
            expect(handleChange.firstCall.returnValue).to.equal(2);
            expect(handleKeyDown.firstCall.returnValue).to.equal(true);
          });

          it('moves focus to the previous tab without activating it', () => {
            const handleChange = spy();
            const handleKeyDown = spy((event) => event.defaultPrevented);
            const { getAllByRole } = render(
              <Tabs
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation}
                value={1}
              >
                <Tab />
                <Tab />
                <Tab />
              </Tabs>,
              { wrapper },
            );
            const [firstTab, secondTab] = getAllByRole('tab');
            secondTab.focus();

            fireEvent.keyDown(secondTab, { key: previousItemKey });

            expect(firstTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(0);
            expect(handleKeyDown.firstCall.returnValue).to.equal(true);
          });

          it('when `selectionFollowsFocus` moves focus to the previous tab while activating it', () => {
            const handleChange = spy((event, value) => value);
            const handleKeyDown = spy((event) => event.defaultPrevented);
            const { getAllByRole } = render(
              <Tabs
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation}
                selectionFollowsFocus
                value={1}
              >
                <Tab />
                <Tab />
                <Tab />
              </Tabs>,
              { wrapper },
            );
            const [firstTab, secondTab] = getAllByRole('tab');
            secondTab.focus();

            fireEvent.keyDown(secondTab, { key: previousItemKey });

            expect(firstTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(1);
            expect(handleChange.firstCall.returnValue).to.equal(0);
            expect(handleKeyDown.firstCall.returnValue).to.equal(true);
          });
        });

        describe(nextItemKey, () => {
          it('moves focus to the first tab without activating it if focus is on the last tab', () => {
            const handleChange = spy();
            const handleKeyDown = spy((event) => event.defaultPrevented);
            const { getAllByRole } = render(
              <Tabs
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation}
                value={1}
              >
                <Tab />
                <Tab />
                <Tab />
              </Tabs>,
              { wrapper },
            );
            const [firstTab, , lastTab] = getAllByRole('tab');
            lastTab.focus();

            fireEvent.keyDown(lastTab, { key: nextItemKey });

            expect(firstTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(0);
            expect(handleKeyDown.firstCall.returnValue).to.equal(true);
          });

          it('when `selectionFollowsFocus` moves focus to the first tab while activating it if focus is on the last tab', () => {
            const handleChange = spy((event, value) => value);
            const handleKeyDown = spy((event) => event.defaultPrevented);
            const { getAllByRole } = render(
              <Tabs
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation}
                selectionFollowsFocus
                value={2}
              >
                <Tab />
                <Tab />
                <Tab />
              </Tabs>,
              { wrapper },
            );
            const [firstTab, , lastTab] = getAllByRole('tab');
            lastTab.focus();

            fireEvent.keyDown(lastTab, { key: nextItemKey });

            expect(firstTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(1);
            expect(handleChange.firstCall.returnValue).to.equal(0);
            expect(handleKeyDown.firstCall.returnValue).to.equal(true);
          });

          it('moves focus to the next tab without activating it it', () => {
            const handleChange = spy();
            const handleKeyDown = spy((event) => event.defaultPrevented);
            const { getAllByRole } = render(
              <Tabs
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation}
                value={1}
              >
                <Tab />
                <Tab />
                <Tab />
              </Tabs>,
              { wrapper },
            );
            const [, secondTab, lastTab] = getAllByRole('tab');
            secondTab.focus();

            fireEvent.keyDown(secondTab, { key: nextItemKey });

            expect(lastTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(0);
            expect(handleKeyDown.firstCall.returnValue).to.equal(true);
          });

          it('when `selectionFollowsFocus` moves focus to the next tab while activating it it', () => {
            const handleChange = spy((event, value) => value);
            const handleKeyDown = spy((event) => event.defaultPrevented);
            const { getAllByRole } = render(
              <Tabs
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation}
                selectionFollowsFocus
                value={1}
              >
                <Tab />
                <Tab />
                <Tab />
              </Tabs>,
              { wrapper },
            );
            const [, secondTab, lastTab] = getAllByRole('tab');
            secondTab.focus();

            fireEvent.keyDown(secondTab, { key: nextItemKey });

            expect(lastTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(1);
            expect(handleChange.firstCall.returnValue).to.equal(2);
            expect(handleKeyDown.firstCall.returnValue).to.equal(true);
          });
        });
      });
    });

    describe('when focus is on a tab regardless of orientation', () => {
      describe('Home', () => {
        it('moves focus to the first tab without activating it', () => {
          const handleChange = spy();
          const handleKeyDown = spy((event) => event.defaultPrevented);
          const { getAllByRole } = render(
            <Tabs onChange={handleChange} onKeyDown={handleKeyDown} value={1}>
              <Tab />
              <Tab />
              <Tab />
            </Tabs>,
          );
          const [firstTab, , lastTab] = getAllByRole('tab');
          lastTab.focus();

          fireEvent.keyDown(lastTab, { key: 'Home' });

          expect(firstTab).toHaveFocus();
          expect(handleChange.callCount).to.equal(0);
          expect(handleKeyDown.firstCall.returnValue).to.equal(true);
        });

        it('when `selectionFollowsFocus` moves focus to the first tab without activating it', () => {
          const handleChange = spy((event, value) => value);
          const handleKeyDown = spy((event) => event.defaultPrevented);
          const { getAllByRole } = render(
            <Tabs onChange={handleChange} onKeyDown={handleKeyDown} selectionFollowsFocus value={2}>
              <Tab />
              <Tab />
              <Tab />
            </Tabs>,
          );
          const [firstTab, , lastTab] = getAllByRole('tab');
          lastTab.focus();

          fireEvent.keyDown(lastTab, { key: 'Home' });

          expect(firstTab).toHaveFocus();
          expect(handleChange.callCount).to.equal(1);
          expect(handleChange.firstCall.returnValue).to.equal(0);
          expect(handleKeyDown.firstCall.returnValue).to.equal(true);
        });
      });

      describe('End', () => {
        it('moves focus to the last tab without activating it', () => {
          const handleChange = spy();
          const handleKeyDown = spy((event) => event.defaultPrevented);
          const { getAllByRole } = render(
            <Tabs onChange={handleChange} onKeyDown={handleKeyDown} value={1}>
              <Tab />
              <Tab />
              <Tab />
            </Tabs>,
          );
          const [firstTab, , lastTab] = getAllByRole('tab');
          firstTab.focus();

          fireEvent.keyDown(firstTab, { key: 'End' });

          expect(lastTab).toHaveFocus();
          expect(handleChange.callCount).to.equal(0);
          expect(handleKeyDown.firstCall.returnValue).to.equal(true);
        });

        it('when `selectionFollowsFocus` moves focus to the last tab without activating it', () => {
          const handleChange = spy((event, value) => value);
          const handleKeyDown = spy((event) => event.defaultPrevented);
          const { getAllByRole } = render(
            <Tabs onChange={handleChange} onKeyDown={handleKeyDown} selectionFollowsFocus value={0}>
              <Tab />
              <Tab />
              <Tab />
            </Tabs>,
          );
          const [firstTab, , lastTab] = getAllByRole('tab');
          firstTab.focus();

          fireEvent.keyDown(firstTab, { key: 'End' });

          expect(lastTab).toHaveFocus();
          expect(handleChange.callCount).to.equal(1);
          expect(handleChange.firstCall.returnValue).to.equal(2);
          expect(handleKeyDown.firstCall.returnValue).to.equal(true);
        });
      });
    });
  });
});
