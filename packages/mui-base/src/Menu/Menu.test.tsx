import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import {
  createMount,
  createRenderer,
  describeConformanceUnstyled,
  fireEvent,
  act,
} from 'test/utils';
import { Menu, menuClasses } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';
import { DropdownContext, DropdownContextValue } from '@mui/base/useDropdown';

const testContext: DropdownContextValue = {
  dispatch: () => {},
  popupId: 'menu-popup',
  registerPopup: () => {},
  registerTrigger: () => {},
  state: { open: true },
  triggerElement: null,
};

describe('<Menu />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(<Menu />, () => ({
    inheritComponent: 'div',
    render: (node) => {
      return render(
        <DropdownContext.Provider value={testContext}>{node}</DropdownContext.Provider>,
      );
    },
    mount: (node: React.ReactNode) => {
      const wrapper = mount(
        <DropdownContext.Provider value={testContext}>{node}</DropdownContext.Provider>,
      );
      return wrapper.childAt(0);
    },
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiMenu',
    slots: {
      root: {
        expectedClassName: menuClasses.root,
      },
      listbox: {
        expectedClassName: menuClasses.listbox,
      },
    },
    skip: ['reactTestRenderer', 'componentProp', 'slotsProp'],
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

    it('highlights the first item when the menu is opened', () => {
      const { getAllByRole } = render(<Test />);
      const [firstItem, ...otherItems] = getAllByRole('menuitem');

      expect(firstItem.tabIndex).to.equal(0);
      otherItems.forEach((item) => {
        expect(item.tabIndex).to.equal(-1);
      });
    });
  });

  describe('keyboard navigation', () => {
    it('changes the highlighted item using the arrow keys', () => {
      const { getByTestId } = render(
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

      act(() => {
        item1.focus();
      });

      fireEvent.keyDown(item1, { key: 'ArrowDown' });
      expect(document.activeElement).to.equal(item2);

      fireEvent.keyDown(item2, { key: 'ArrowDown' });
      expect(document.activeElement).to.equal(item3);

      fireEvent.keyDown(item3, { key: 'ArrowUp' });
      expect(document.activeElement).to.equal(item2);
    });

    it('changes the highlighted item using the Home and End keys', () => {
      const { getByTestId } = render(
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

      act(() => {
        item1.focus();
      });

      fireEvent.keyDown(item1, { key: 'End' });
      expect(document.activeElement).to.equal(getByTestId('item-3'));

      fireEvent.keyDown(item3, { key: 'Home' });
      expect(document.activeElement).to.equal(getByTestId('item-1'));
    });

    it('includes disabled items during keyboard navigation', () => {
      const { getByTestId } = render(
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

      act(() => {
        item1.focus();
      });

      fireEvent.keyDown(item1, { key: 'ArrowDown' });
      expect(document.activeElement).to.equal(item2);

      expect(item2).to.have.attribute('aria-disabled', 'true');
    });

    describe('text navigation', () => {
      it('changes the highlighted item', function test() {
        if (/jsdom/.test(window.navigator.userAgent)) {
          // useMenu Text navigation match menu items using HTMLElement.innerText
          // innerText is not supported by JsDom
          this.skip();
        }

        const { getByText, getAllByRole } = render(
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

        act(() => {
          items[0].focus();
        });

        fireEvent.keyDown(items[0], { key: 'c' });
        expect(document.activeElement).to.equal(getByText('Ca'));
        expect(getByText('Ca')).to.have.attribute('tabindex', '0');

        fireEvent.keyDown(items[3], { key: 'd' });
        expect(document.activeElement).to.equal(getByText('Cd'));
        expect(getByText('Cd')).to.have.attribute('tabindex', '0');
      });

      it('repeated keys circulate all items starting with that letter', function test() {
        if (/jsdom/.test(window.navigator.userAgent)) {
          // useMenu Text navigation match menu items using HTMLElement.innerText
          // innerText is not supported by JsDom
          this.skip();
        }

        const { getByText, getAllByRole } = render(
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

        act(() => {
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

      it('changes the highlighted item using text navigation on label prop', () => {
        const { getAllByRole } = render(
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

        act(() => {
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

      it('skips the non-stringifiable items', function test() {
        if (/jsdom/.test(window.navigator.userAgent)) {
          // useMenu Text navigation match menu items using HTMLElement.innerText
          // innerText is not supported by JsDom
          this.skip();
        }

        const { getByText, getAllByRole } = render(
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

        act(() => {
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

      it('navigate to options with diacritic characters', function test() {
        if (/jsdom/.test(window.navigator.userAgent)) {
          // useMenu Text navigation match menu items using HTMLElement.innerText
          // innerText is not supported by JsDom
          this.skip();
        }

        const { getByText, getAllByRole } = render(
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

        act(() => {
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

      it('navigate to next options with beginning diacritic characters', function test() {
        if (/jsdom/.test(window.navigator.userAgent)) {
          // useMenu Text navigation match menu items using HTMLElement.innerText
          // innerText is not supported by JsDom
          this.skip();
        }

        const { getByText, getAllByRole } = render(
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

        act(() => {
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
    it('should be called when the menu items change', () => {
      const handleItemsChange = spy();

      const { setProps } = render(
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
});
