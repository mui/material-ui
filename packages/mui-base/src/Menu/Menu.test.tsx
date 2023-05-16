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
import Menu, { menuClasses } from '@mui/base/Menu';
import MenuItem from '@mui/base/MenuItem';

describe('<Menu />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  const defaultProps = {
    anchorEl: document.createElement('div'),
    open: true,
  };

  describeConformanceUnstyled(<Menu {...defaultProps} />, () => ({
    inheritComponent: 'div',
    render,
    mount,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiMenu',
    slots: {
      root: {
        expectedClassName: menuClasses.root,
        testWithElement: null,
      },
      listbox: {
        expectedClassName: menuClasses.listbox,
      },
    },
    skip: ['reactTestRenderer', 'propsSpread', 'componentProp', 'slotsProp'],
  }));

  describe('after initialization', () => {
    const spyFocus = spy();

    function Test() {
      React.useEffect(() => {
        document.addEventListener('focus', spyFocus, true);
        return () => {
          document.removeEventListener('focus', spyFocus, true);
        };
      }, []);

      return (
        <Menu {...defaultProps}>
          <MenuItem>1</MenuItem>
          <MenuItem>2</MenuItem>
          <MenuItem>3</MenuItem>
        </Menu>
      );
    }

    it('highlights the first item when the menu is opened', () => {
      const { getAllByRole } = render(<Test />);
      const [firstItem, ...otherItems] = getAllByRole('menuitem');

      expect(firstItem.tabIndex).to.equal(0);
      otherItems.forEach((item) => {
        expect(item.tabIndex).to.equal(-1);
      });
      expect(spyFocus.callCount).to.equal(1);
      expect(spyFocus.firstCall.args[0]).to.have.property('target', firstItem);
    });
  });

  describe('keyboard navigation', () => {
    it('changes the highlighted item using the arrow keys', () => {
      const { getByTestId } = render(
        <Menu {...defaultProps}>
          <MenuItem data-testid="item-1">1</MenuItem>
          <MenuItem data-testid="item-2">2</MenuItem>
          <MenuItem data-testid="item-3">3</MenuItem>
        </Menu>,
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
        <Menu {...defaultProps}>
          <MenuItem data-testid="item-1">1</MenuItem>
          <MenuItem data-testid="item-2">2</MenuItem>
          <MenuItem data-testid="item-3">3</MenuItem>
        </Menu>,
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
        <Menu {...defaultProps}>
          <MenuItem data-testid="item-1">1</MenuItem>
          <MenuItem disabled data-testid="item-2">
            2
          </MenuItem>
        </Menu>,
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
          <Menu {...defaultProps}>
            <MenuItem>Aa</MenuItem>
            <MenuItem>Ba</MenuItem>
            <MenuItem>Bb</MenuItem>
            <MenuItem>Ca</MenuItem>
            <MenuItem>Cb</MenuItem>
            <MenuItem>Cd</MenuItem>
          </Menu>,
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
          <Menu {...defaultProps}>
            <MenuItem>Aa</MenuItem>
            <MenuItem>Ba</MenuItem>
            <MenuItem>Bb</MenuItem>
            <MenuItem>Ca</MenuItem>
          </Menu>,
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
          <Menu {...defaultProps}>
            <MenuItem label="Aa">1</MenuItem>
            <MenuItem label="Ba">2</MenuItem>
            <MenuItem label="Bb">3</MenuItem>
            <MenuItem label="Ca">4</MenuItem>
          </Menu>,
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
          <Menu {...defaultProps}>
            <MenuItem>Aa</MenuItem>
            <MenuItem>Ba</MenuItem>
            <MenuItem />
            <MenuItem>
              <div>Nested Content</div>
            </MenuItem>
            <MenuItem>{undefined}</MenuItem>
            <MenuItem>{null}</MenuItem>
            <MenuItem>Bc</MenuItem>
          </Menu>,
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
          <Menu {...defaultProps}>
            <MenuItem>Aa</MenuItem>
            <MenuItem>Ba</MenuItem>
            <MenuItem>Bb</MenuItem>
            <MenuItem>Bą</MenuItem>
          </Menu>,
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
          <Menu {...defaultProps}>
            <MenuItem>Aa</MenuItem>
            <MenuItem>ąa</MenuItem>
            <MenuItem>ąb</MenuItem>
            <MenuItem>ąc</MenuItem>
          </Menu>,
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
});
