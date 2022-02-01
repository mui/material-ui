/* eslint-disable no-console */
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

  describeConformanceUnstyled(<MenuUnstyled />, () => ({
    inheritComponent: 'ul',
    render,
    mount,
    refInstanceof: window.HTMLUListElement,
    testComponentPropWith: 'span',
    muiName: 'MuiMenuUnstyled',
    slots: {
      root: {
        expectedClassName: menuUnstyledClasses.root,
      },
    },
  }));

  describe('keyboard navigation', () => {
    it('changes the highlighted item using the arrow keys', () => {
      const { getByTestId } = render(
        <MenuUnstyled>
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
      expect(document.activeElement).to.equal(getByTestId('item-2'));

      fireEvent.keyDown(item2, { key: 'ArrowDown' });
      expect(document.activeElement).to.equal(getByTestId('item-3'));

      fireEvent.keyDown(item3, { key: 'ArrowUp' });
      expect(document.activeElement).to.equal(getByTestId('item-2'));
    });

    it('changes the highlighted item using the Home and End keys', () => {
      const { getByTestId } = render(
        <MenuUnstyled>
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
  });
});
