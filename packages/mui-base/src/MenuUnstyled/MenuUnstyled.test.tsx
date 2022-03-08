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
  });
});
