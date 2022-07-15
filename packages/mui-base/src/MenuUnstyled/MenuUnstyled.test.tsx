import * as React from 'react';
import { expect } from 'chai';
import {
  createMount,
  createRenderer,
  describeConformanceUnstyled,
  fireEvent,
  act,
} from 'test/utils';
import MenuUnstyled, { menuUnstyledClasses } from '@mui/base/MenuUnstyled';
import MenuItemUnstyled from '@mui/base/MenuItemUnstyled';

describe('MenuUnstyled', () => {
  const mount = createMount();
  const { render } = createRenderer();

  const defaultProps = {
    anchorEl: document.createElement('div'),
    open: true,
  };

  describeConformanceUnstyled(<MenuUnstyled {...defaultProps} />, () => ({
    inheritComponent: 'div',
    render,
    mount,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiMenuUnstyled',
    slots: {
      root: {
        expectedClassName: menuUnstyledClasses.root,
        testWithElement: null,
      },
      listbox: {
        expectedClassName: menuUnstyledClasses.listbox,
      },
    },
    skip: ['reactTestRenderer', 'propsSpread', 'componentProp', 'componentsProp'],
  }));

  describe('keyboard navigation', () => {
    it('changes the highlighted item using the arrow keys', () => {
      const { getByTestId } = render(
        <MenuUnstyled {...defaultProps}>
          <MenuItemUnstyled data-testid="item-1">1</MenuItemUnstyled>
          <MenuItemUnstyled data-testid="item-2">2</MenuItemUnstyled>
          <MenuItemUnstyled data-testid="item-3">3</MenuItemUnstyled>
        </MenuUnstyled>,
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
        <MenuUnstyled {...defaultProps}>
          <MenuItemUnstyled data-testid="item-1">1</MenuItemUnstyled>
          <MenuItemUnstyled data-testid="item-2">2</MenuItemUnstyled>
          <MenuItemUnstyled data-testid="item-3">3</MenuItemUnstyled>
        </MenuUnstyled>,
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
        <MenuUnstyled {...defaultProps}>
          <MenuItemUnstyled data-testid="item-1">1</MenuItemUnstyled>
          <MenuItemUnstyled disabled data-testid="item-2">
            2
          </MenuItemUnstyled>
        </MenuUnstyled>,
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
          <MenuUnstyled {...defaultProps}>
            <MenuItemUnstyled>Aa</MenuItemUnstyled>
            <MenuItemUnstyled>Ba</MenuItemUnstyled>
            <MenuItemUnstyled>Bb</MenuItemUnstyled>
            <MenuItemUnstyled>Ca</MenuItemUnstyled>
            <MenuItemUnstyled>Cb</MenuItemUnstyled>
            <MenuItemUnstyled>Cd</MenuItemUnstyled>
          </MenuUnstyled>,
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
          <MenuUnstyled {...defaultProps}>
            <MenuItemUnstyled>Aa</MenuItemUnstyled>
            <MenuItemUnstyled>Ba</MenuItemUnstyled>
            <MenuItemUnstyled>Bb</MenuItemUnstyled>
            <MenuItemUnstyled>Ca</MenuItemUnstyled>
          </MenuUnstyled>,
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
          <MenuUnstyled {...defaultProps}>
            <MenuItemUnstyled label="Aa">1</MenuItemUnstyled>
            <MenuItemUnstyled label="Ba">2</MenuItemUnstyled>
            <MenuItemUnstyled label="Bb">3</MenuItemUnstyled>
            <MenuItemUnstyled label="Ca">4</MenuItemUnstyled>
          </MenuUnstyled>,
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
          <MenuUnstyled {...defaultProps}>
            <MenuItemUnstyled>Aa</MenuItemUnstyled>
            <MenuItemUnstyled>Ba</MenuItemUnstyled>
            <MenuItemUnstyled />
            <MenuItemUnstyled>
              <div>Nested Content</div>
            </MenuItemUnstyled>
            <MenuItemUnstyled>{undefined}</MenuItemUnstyled>
            <MenuItemUnstyled>{null}</MenuItemUnstyled>
            <MenuItemUnstyled>Bc</MenuItemUnstyled>
          </MenuUnstyled>,
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
          <MenuUnstyled {...defaultProps}>
            <MenuItemUnstyled>Aa</MenuItemUnstyled>
            <MenuItemUnstyled>Ba</MenuItemUnstyled>
            <MenuItemUnstyled>Bb</MenuItemUnstyled>
            <MenuItemUnstyled>Bą</MenuItemUnstyled>
          </MenuUnstyled>,
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
          <MenuUnstyled {...defaultProps}>
            <MenuItemUnstyled>Aa</MenuItemUnstyled>
            <MenuItemUnstyled>ąa</MenuItemUnstyled>
            <MenuItemUnstyled>ąb</MenuItemUnstyled>
            <MenuItemUnstyled>ąc</MenuItemUnstyled>
          </MenuUnstyled>,
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
