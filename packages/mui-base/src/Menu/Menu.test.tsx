import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import {
  createRenderer,
  fireEvent,
  act,
  MuiRenderResult,
  RenderOptions,
  flushMicrotasks,
} from '@mui/internal-test-utils';
import { Menu, menuClasses } from '@mui/base/Menu';
import { MenuItem, MenuItemRootSlotProps } from '@mui/base/MenuItem';
import { DropdownContext, DropdownContextValue } from '@mui/base/useDropdown';
import { Popper } from '@mui/base/Popper';
import { MenuProvider, useMenu } from '@mui/base/useMenu';
import { describeConformanceUnstyled } from '../../test/describeConformanceUnstyled';

const testContext: DropdownContextValue = {
  dispatch: () => {},
  popupId: 'menu-popup',
  registerPopup: () => {},
  registerTrigger: () => {},
  state: { open: true, changeReason: null },
  triggerElement: null,
};

describe('<Menu />', () => {
  const { render: internalRender } = createRenderer();

  async function render(
    element: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
    options?: RenderOptions,
  ): Promise<MuiRenderResult> {
    const rendered = await internalRender(element, options);
    await flushMicrotasks();
    return rendered;
  }

  describeConformanceUnstyled(<Menu />, () => ({
    inheritComponent: 'div',
    render: (node) => {
      return render(
        <DropdownContext.Provider value={testContext}>{node}</DropdownContext.Provider>,
      );
    },
    refInstanceof: window.HTMLDivElement,
    slots: {
      root: {
        expectedClassName: menuClasses.root,
      },
      listbox: {
        expectedClassName: menuClasses.listbox,
      },
    },
    skip: ['componentProp', 'slotsProp'],
  }));

  describe('after initialization', () => {
    function Test() {
      return (
        <DropdownContext.Provider value={testContext}>
          <Menu>
            <MenuItem>1</MenuItem>
            <MenuItem>2</MenuItem>
            <MenuItem>3</MenuItem>
          </Menu>
        </DropdownContext.Provider>
      );
    }

    it('highlights the first item when the menu is opened', async () => {
      const { getAllByRole } = await render(<Test />);
      const [firstItem, ...otherItems] = getAllByRole('menuitem');

      expect(firstItem.tabIndex).to.equal(0);
      otherItems.forEach((item) => {
        expect(item.tabIndex).to.equal(-1);
      });
    });

    it('highlights first item when down arrow key opens the menu', async () => {
      const context: DropdownContextValue = {
        ...testContext,
        state: {
          ...testContext.state,
          open: true,
          changeReason: {
            type: 'keydown',
            key: 'ArrowDown',
          } as React.KeyboardEvent,
        },
      };
      const { getAllByRole } = await render(
        <DropdownContext.Provider value={context}>
          <Menu>
            <MenuItem>1</MenuItem>
            <MenuItem>2</MenuItem>
            <MenuItem>3</MenuItem>
          </Menu>
        </DropdownContext.Provider>,
      );
      const [firstItem, ...otherItems] = getAllByRole('menuitem');

      expect(firstItem.tabIndex).to.equal(0);
      otherItems.forEach((item) => {
        expect(item.tabIndex).to.equal(-1);
      });
    });

    it('highlights last item when up arrow key opens the menu', async () => {
      const context: DropdownContextValue = {
        ...testContext,
        state: {
          ...testContext.state,
          open: true,
          changeReason: {
            key: 'ArrowUp',
            type: 'keydown',
          } as React.KeyboardEvent,
        },
      };
      const { getAllByRole } = await render(
        <DropdownContext.Provider value={context}>
          <Menu>
            <MenuItem>1</MenuItem>
            <MenuItem>2</MenuItem>
            <MenuItem>3</MenuItem>
          </Menu>
        </DropdownContext.Provider>,
      );

      const [firstItem, secondItem, lastItem] = getAllByRole('menuitem');

      expect(lastItem.tabIndex).to.equal(0);
      [firstItem, secondItem].forEach((item) => {
        expect(item.tabIndex).to.equal(-1);
      });
    });

    it('highlights last non-disabled item when disabledItemsFocusable is set to false', async () => {
      const CustomMenu = React.forwardRef(function CustomMenu(
        props: React.ComponentPropsWithoutRef<'ul'>,
        ref: React.Ref<HTMLUListElement>,
      ) {
        const { children, ...other } = props;

        const { open, triggerElement, contextValue, getListboxProps } = useMenu({
          listboxRef: ref,
          disabledItemsFocusable: false,
        });

        const anchorEl = triggerElement ?? document.createElement('div');

        return (
          <Popper open={open} anchorEl={anchorEl}>
            <ul className="menu-root" {...other} {...getListboxProps()}>
              <MenuProvider value={contextValue}>{children}</MenuProvider>
            </ul>
          </Popper>
        );
      });

      const context: DropdownContextValue = {
        ...testContext,
        state: {
          ...testContext.state,
          open: true,
          changeReason: {
            key: 'ArrowUp',
            type: 'keydown',
          } as React.KeyboardEvent,
        },
      };
      const { getAllByRole } = await render(
        <DropdownContext.Provider value={context}>
          <CustomMenu>
            <MenuItem>1</MenuItem>
            <MenuItem>2</MenuItem>
            <MenuItem disabled>3</MenuItem>
          </CustomMenu>
        </DropdownContext.Provider>,
      );
      const [firstItem, secondItem, lastItem] = getAllByRole('menuitem');

      expect(secondItem.tabIndex).to.equal(0);
      [firstItem, lastItem].forEach((item) => {
        expect(item.tabIndex).to.equal(-1);
      });
    });
  });

  describe('keyboard navigation', () => {
    it('changes the highlighted item using the arrow keys', async () => {
      const { getByTestId } = await render(
        <DropdownContext.Provider value={testContext}>
          <Menu>
            <MenuItem data-testid="item-1">1</MenuItem>
            <MenuItem data-testid="item-2">2</MenuItem>
            <MenuItem data-testid="item-3">3</MenuItem>
          </Menu>
        </DropdownContext.Provider>,
      );

      const item1 = getByTestId('item-1');
      const item2 = getByTestId('item-2');
      const item3 = getByTestId('item-3');

      await act(() => {
        item1.focus();
      });

      fireEvent.keyDown(item1, { key: 'ArrowDown' });
      expect(document.activeElement).to.equal(item2);

      fireEvent.keyDown(item2, { key: 'ArrowDown' });
      expect(document.activeElement).to.equal(item3);

      fireEvent.keyDown(item3, { key: 'ArrowUp' });
      expect(document.activeElement).to.equal(item2);
    });

    it('changes the highlighted item using the Home and End keys', async () => {
      const { getByTestId } = await render(
        <DropdownContext.Provider value={testContext}>
          <Menu>
            <MenuItem data-testid="item-1">1</MenuItem>
            <MenuItem data-testid="item-2">2</MenuItem>
            <MenuItem data-testid="item-3">3</MenuItem>
          </Menu>
        </DropdownContext.Provider>,
      );

      const item1 = getByTestId('item-1');
      const item3 = getByTestId('item-3');

      await act(() => {
        item1.focus();
      });

      fireEvent.keyDown(item1, { key: 'End' });
      expect(document.activeElement).to.equal(getByTestId('item-3'));

      fireEvent.keyDown(item3, { key: 'Home' });
      expect(document.activeElement).to.equal(getByTestId('item-1'));
    });

    it('includes disabled items during keyboard navigation', async () => {
      const { getByTestId } = await render(
        <DropdownContext.Provider value={testContext}>
          <Menu>
            <MenuItem data-testid="item-1">1</MenuItem>
            <MenuItem disabled data-testid="item-2">
              2
            </MenuItem>
          </Menu>
        </DropdownContext.Provider>,
      );

      const item1 = getByTestId('item-1');
      const item2 = getByTestId('item-2');

      await act(() => {
        item1.focus();
      });

      fireEvent.keyDown(item1, { key: 'ArrowDown' });
      expect(document.activeElement).to.equal(item2);

      expect(item2).to.have.attribute('aria-disabled', 'true');
    });

    describe('text navigation', () => {
      it('changes the highlighted item', async function test() {
        if (/jsdom/.test(window.navigator.userAgent)) {
          // useMenu Text navigation match menu items using HTMLElement.innerText
          // innerText is not supported by JsDom
          this.skip();
        }

        const { getByText, getAllByRole } = await render(
          <DropdownContext.Provider value={testContext}>
            <Menu>
              <MenuItem>Aa</MenuItem>
              <MenuItem>Ba</MenuItem>
              <MenuItem>Bb</MenuItem>
              <MenuItem>Ca</MenuItem>
              <MenuItem>Cb</MenuItem>
              <MenuItem>Cd</MenuItem>
            </Menu>
          </DropdownContext.Provider>,
        );

        const items = getAllByRole('menuitem');

        await act(() => {
          items[0].focus();
        });

        fireEvent.keyDown(items[0], { key: 'c' });
        expect(document.activeElement).to.equal(getByText('Ca'));
        expect(getByText('Ca')).to.have.attribute('tabindex', '0');

        fireEvent.keyDown(items[3], { key: 'd' });
        expect(document.activeElement).to.equal(getByText('Cd'));
        expect(getByText('Cd')).to.have.attribute('tabindex', '0');
      });

      it('repeated keys circulate all items starting with that letter', async function test() {
        if (/jsdom/.test(window.navigator.userAgent)) {
          // useMenu Text navigation match menu items using HTMLElement.innerText
          // innerText is not supported by JsDom
          this.skip();
        }

        const { getByText, getAllByRole } = await render(
          <DropdownContext.Provider value={testContext}>
            <Menu>
              <MenuItem>Aa</MenuItem>
              <MenuItem>Ba</MenuItem>
              <MenuItem>Bb</MenuItem>
              <MenuItem>Ca</MenuItem>
            </Menu>
          </DropdownContext.Provider>,
        );

        const items = getAllByRole('menuitem');

        await act(() => {
          items[0].focus();
        });

        fireEvent.keyDown(items[0], { key: 'b' });
        expect(document.activeElement).to.equal(getByText('Ba'));
        expect(getByText('Ba')).to.have.attribute('tabindex', '0');

        fireEvent.keyDown(items[1], { key: 'b' });
        expect(document.activeElement).to.equal(getByText('Bb'));
        expect(getByText('Bb')).to.have.attribute('tabindex', '0');

        fireEvent.keyDown(items[2], { key: 'b' });
        expect(document.activeElement).to.equal(getByText('Ba'));
        expect(getByText('Ba')).to.have.attribute('tabindex', '0');
      });

      it('changes the highlighted item using text navigation on label prop', async () => {
        const { getAllByRole } = await render(
          <DropdownContext.Provider value={testContext}>
            <Menu>
              <MenuItem label="Aa">1</MenuItem>
              <MenuItem label="Ba">2</MenuItem>
              <MenuItem label="Bb">3</MenuItem>
              <MenuItem label="Ca">4</MenuItem>
            </Menu>
          </DropdownContext.Provider>,
        );

        const items = getAllByRole('menuitem');

        await act(() => {
          items[0].focus();
        });

        fireEvent.keyDown(items[0], { key: 'b' });
        expect(document.activeElement).to.equal(items[1]);
        expect(items[1]).to.have.attribute('tabindex', '0');

        fireEvent.keyDown(items[1], { key: 'b' });
        expect(document.activeElement).to.equal(items[2]);
        expect(items[2]).to.have.attribute('tabindex', '0');

        fireEvent.keyDown(items[2], { key: 'b' });
        expect(document.activeElement).to.equal(items[1]);
        expect(items[1]).to.have.attribute('tabindex', '0');
      });

      it('skips the non-stringifiable items', async function test() {
        if (/jsdom/.test(window.navigator.userAgent)) {
          // useMenu Text navigation match menu items using HTMLElement.innerText
          // innerText is not supported by JsDom
          this.skip();
        }

        const { getByText, getAllByRole } = await render(
          <DropdownContext.Provider value={testContext}>
            <Menu>
              <MenuItem>Aa</MenuItem>
              <MenuItem>Ba</MenuItem>
              <MenuItem />
              <MenuItem>
                <div>Nested Content</div>
              </MenuItem>
              <MenuItem>{undefined}</MenuItem>
              <MenuItem>{null}</MenuItem>
              <MenuItem>Bc</MenuItem>
            </Menu>
          </DropdownContext.Provider>,
        );

        const items = getAllByRole('menuitem');

        await act(() => {
          items[0].focus();
        });

        fireEvent.keyDown(items[0], { key: 'b' });
        expect(document.activeElement).to.equal(getByText('Ba'));
        expect(getByText('Ba')).to.have.attribute('tabindex', '0');

        fireEvent.keyDown(items[1], { key: 'b' });
        expect(document.activeElement).to.equal(getByText('Bc'));
        expect(getByText('Bc')).to.have.attribute('tabindex', '0');

        fireEvent.keyDown(items[6], { key: 'b' });
        expect(document.activeElement).to.equal(getByText('Ba'));
        expect(getByText('Ba')).to.have.attribute('tabindex', '0');
      });

      it('navigate to options with diacritic characters', async function test() {
        if (/jsdom/.test(window.navigator.userAgent)) {
          // useMenu Text navigation match menu items using HTMLElement.innerText
          // innerText is not supported by JsDom
          this.skip();
        }

        const { getByText, getAllByRole } = await render(
          <DropdownContext.Provider value={testContext}>
            <Menu>
              <MenuItem>Aa</MenuItem>
              <MenuItem>Ba</MenuItem>
              <MenuItem>Bb</MenuItem>
              <MenuItem>Bą</MenuItem>
            </Menu>
          </DropdownContext.Provider>,
        );

        const items = getAllByRole('menuitem');

        await act(() => {
          items[0].focus();
        });

        fireEvent.keyDown(items[0], { key: 'b' });
        expect(document.activeElement).to.equal(getByText('Ba'));
        expect(getByText('Ba')).to.have.attribute('tabindex', '0');

        fireEvent.keyDown(items[1], { key: 'Control' });
        fireEvent.keyDown(items[1], { key: 'Alt' });
        fireEvent.keyDown(items[1], { key: 'ą' });
        expect(document.activeElement).to.equal(getByText('Bą'));
        expect(getByText('Bą')).to.have.attribute('tabindex', '0');
      });

      it('navigate to next options with beginning diacritic characters', async function test() {
        if (/jsdom/.test(window.navigator.userAgent)) {
          // useMenu Text navigation match menu items using HTMLElement.innerText
          // innerText is not supported by JsDom
          this.skip();
        }

        const { getByText, getAllByRole } = await render(
          <DropdownContext.Provider value={testContext}>
            <Menu>
              <MenuItem>Aa</MenuItem>
              <MenuItem>ąa</MenuItem>
              <MenuItem>ąb</MenuItem>
              <MenuItem>ąc</MenuItem>
            </Menu>
          </DropdownContext.Provider>,
        );

        const items = getAllByRole('menuitem');

        await act(() => {
          items[0].focus();
        });

        fireEvent.keyDown(items[0], { key: 'Control' });
        fireEvent.keyDown(items[0], { key: 'Alt' });
        fireEvent.keyDown(items[0], { key: 'ą' });
        expect(document.activeElement).to.equal(getByText('ąa'));
        expect(getByText('ąa')).to.have.attribute('tabindex', '0');

        fireEvent.keyDown(items[1], { key: 'Alt' });
        fireEvent.keyDown(items[1], { key: 'Control' });
        fireEvent.keyDown(items[1], { key: 'ą' });
        expect(document.activeElement).to.equal(getByText('ąb'));
        expect(getByText('ąb')).to.have.attribute('tabindex', '0');

        fireEvent.keyDown(items[2], { key: 'Control' });
        fireEvent.keyDown(items[2], { key: 'AltGraph' });
        fireEvent.keyDown(items[2], { key: 'ą' });
        expect(document.activeElement).to.equal(getByText('ąc'));
        expect(getByText('ąc')).to.have.attribute('tabindex', '0');
      });
    });
  });

  describe('prop: onItemsChange', () => {
    it('should be called when the menu items change', async () => {
      const handleItemsChange = spy();

      const { setProps } = await render(
        <DropdownContext.Provider value={testContext}>
          <Menu onItemsChange={handleItemsChange}>
            <MenuItem key="1">1</MenuItem>
            <MenuItem key="2">2</MenuItem>
          </Menu>
        </DropdownContext.Provider>,
      );

      // The first call is the initial render.
      expect(handleItemsChange.callCount).to.equal(1);

      setProps({
        children: (
          <Menu onItemsChange={handleItemsChange}>
            <MenuItem key="1">1</MenuItem>
            <MenuItem key="3">3</MenuItem>
          </Menu>
        ),
      });

      expect(handleItemsChange.callCount).to.equal(2);
    });
  });

  describe('prop: anchor', () => {
    it('should be placed near the specified element', async function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      function TestComponent() {
        const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);

        return (
          <div>
            <DropdownContext.Provider value={testContext}>
              <Menu
                anchor={anchor}
                slotProps={{ root: { 'data-testid': 'popup', placement: 'bottom-start' } as any }}
              >
                <MenuItem>1</MenuItem>
                <MenuItem>2</MenuItem>
              </Menu>
            </DropdownContext.Provider>
            <div data-testid="anchor" style={{ marginTop: '100px' }} ref={setAnchor} />
          </div>
        );
      }

      const { getByTestId } = await render(<TestComponent />);

      const popup = getByTestId('popup');
      const anchor = getByTestId('anchor');

      const anchorPosition = anchor.getBoundingClientRect();

      await new Promise<void>((resolve) => {
        // position gets updated in the next frame
        requestAnimationFrame(() => {
          expect(popup.style.getPropertyValue('transform')).to.equal(
            `translate(${anchorPosition.left}px, ${anchorPosition.bottom}px)`,
          );
          resolve();
        });
      });
    });

    it('should be placed at the specified position', async function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const boundingRect = {
        x: 200,
        y: 100,
        top: 100,
        left: 200,
        bottom: 100,
        right: 200,
        height: 0,
        width: 0,
        toJSON: () => {},
      };

      const virtualElement = { getBoundingClientRect: () => boundingRect };

      const { getByTestId } = await render(
        <DropdownContext.Provider value={testContext}>
          <Menu
            anchor={virtualElement}
            slotProps={{ root: { 'data-testid': 'popup', placement: 'bottom-start' } as any }}
          >
            <MenuItem>1</MenuItem>
            <MenuItem>2</MenuItem>
          </Menu>
        </DropdownContext.Provider>,
      );
      const popup = getByTestId('popup');

      await new Promise<void>((resolve) => {
        // position gets updated in the next frame
        requestAnimationFrame(() => {
          expect(popup.style.getPropertyValue('transform')).to.equal(`translate(200px, 100px)`);
          resolve();
        });
      });
    });
  });

  it('perf: does not rerender menu items unnecessarily', async function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      // JSDOM doesn't support :focus-visible
      this.skip();
    }

    const renderItem1Spy = spy();
    const renderItem2Spy = spy();
    const renderItem3Spy = spy();
    const renderItem4Spy = spy();

    const LoggingRoot = React.forwardRef(function LoggingRoot(
      props: MenuItemRootSlotProps & { renderSpy: () => void },
      ref: React.ForwardedRef<HTMLLIElement>,
    ) {
      const { renderSpy, ownerState, ...other } = props;
      renderSpy();
      return <li {...other} ref={ref} />;
    });

    const { getAllByRole } = await render(
      <DropdownContext.Provider value={testContext}>
        <Menu>
          <MenuItem
            slots={{ root: LoggingRoot }}
            slotProps={{ root: { renderSpy: renderItem1Spy } as any }}
            id="item-1"
          >
            1
          </MenuItem>
          <MenuItem
            slots={{ root: LoggingRoot }}
            slotProps={{ root: { renderSpy: renderItem2Spy } as any }}
            id="item-2"
          >
            2
          </MenuItem>
          <MenuItem
            slots={{ root: LoggingRoot }}
            slotProps={{ root: { renderSpy: renderItem3Spy } as any }}
            id="item-3"
          >
            3
          </MenuItem>
          <MenuItem
            slots={{ root: LoggingRoot }}
            slotProps={{ root: { renderSpy: renderItem4Spy } as any }}
            id="item-4"
          >
            4
          </MenuItem>
        </Menu>
      </DropdownContext.Provider>,
    );

    const menuItems = getAllByRole('menuitem');
    await act(() => {
      menuItems[0].focus();
    });

    renderItem1Spy.resetHistory();
    renderItem2Spy.resetHistory();
    renderItem3Spy.resetHistory();
    renderItem4Spy.resetHistory();

    expect(renderItem1Spy.callCount).to.equal(0);

    fireEvent.keyDown(menuItems[0], { key: 'ArrowDown' }); // highlights '2'

    // React renders twice in strict mode, so we expect twice the number of spy calls
    // Also, useButton's focusVisible polyfill causes an extra render when focus is gained/lost.

    expect(renderItem1Spy.callCount).to.equal(4); // '1' rerenders as it loses highlight
    expect(renderItem2Spy.callCount).to.equal(4); // '2' rerenders as it receives highlight

    // neither the highlighted nor the selected state of these options changed,
    // so they don't need to rerender:
    expect(renderItem3Spy.callCount).to.equal(0);
    expect(renderItem4Spy.callCount).to.equal(0);
  });
});
