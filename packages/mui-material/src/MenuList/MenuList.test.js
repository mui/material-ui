import * as React from 'react';
import { expect } from 'chai';
import { stub } from 'sinon';
import { createRenderer, fireEvent, screen } from '@mui/internal-test-utils';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import getScrollbarSize from '../utils/getScrollbarSize';
import describeConformance from '../../test/describeConformance';

function setStyleWidthForJsdomOrBrowser(style, width) {
  style.width = '';
  style.width = 'calc(100% + 0px)';
  if (style.width !== 'calc(100% + 0px)') {
    // For jsdom
    Object.defineProperty(style, 'width', { writable: true, value: '' });
  }
  style.width = width;
}

describe('<MenuList />', () => {
  const { render } = createRenderer();

  describeConformance(<MenuList />, () => ({
    render,
    classes: {},
    inheritComponent: List,
    refInstanceof: window.HTMLUListElement,
    skip: ['componentProp', 'themeDefaultProps', 'themeStyleOverrides', 'themeVariants'],
  }));

  it('should render a list with role menu and tabIndex -1', () => {
    render(
      <MenuList>
        <div role="menuitem">one</div>
        <div role="menuitem">two</div>
      </MenuList>,
    );

    expect(screen.getByRole('menu')).to.have.attribute('tabIndex', '-1');
  });

  describe('prop: children', () => {
    it('should support null children', () => {
      render(
        <MenuList>
          <div role="menuitem">one</div>
          <div role="menuitem">two</div>
          {null}
        </MenuList>,
      );

      expect(screen.getAllByRole('menuitem')).to.have.length(2);
    });

    it('should not add tabIndex to presentation elements like Divider when all Menu Items are disabled', () => {
      render(
        <MenuList>
          <MenuItem>one</MenuItem>
          <Divider />
          <MenuItem>two</MenuItem>
        </MenuList>,
      );

      expect(screen.getByRole('separator')).not.to.have.attribute('tabIndex');
    });
  });

  describe('actions: adjustStyleForScrollbar', () => {
    const expectedPadding = `${getScrollbarSize(window)}px`;

    it('should not adjust style when container element height is greater', () => {
      const menuListActionsRef = React.createRef();
      const listRef = React.createRef();
      render(<MenuList ref={listRef} actions={menuListActionsRef} />);
      const list = listRef.current;

      expect(list.style).to.have.property('paddingRight', '');
      expect(list.style).to.have.property('paddingLeft', '');
      expect(list.style).to.have.property('width', '');

      menuListActionsRef.current.adjustStyleForScrollbar(
        { clientHeight: 20 },
        { direction: 'ltr' },
      );

      expect(list.style).to.have.property('paddingRight', '');
      expect(list.style).to.have.property('paddingLeft', '');
      expect(list.style).to.have.property('width', '');
    });

    it('should adjust style when container element height is less', () => {
      const menuListActionsRef = React.createRef();
      const listRef = React.createRef();
      render(<MenuList ref={listRef} actions={menuListActionsRef} />);
      const list = listRef.current;
      setStyleWidthForJsdomOrBrowser(list.style, '');
      stub(list, 'clientHeight').get(() => 11);

      expect(list.style).to.have.property('paddingRight', '');
      expect(list.style).to.have.property('paddingLeft', '');
      expect(list.style).to.have.property('width', '');

      menuListActionsRef.current.adjustStyleForScrollbar(
        { clientHeight: 10 },
        { direction: 'ltr' },
      );

      expect(list.style).to.have.property('paddingRight', expectedPadding);
      expect(list.style).to.have.property('paddingLeft', '');
      expect(list.style).to.have.property('width', `calc(100% + ${expectedPadding})`);
    });

    it('should adjust paddingLeft when direction=rtl', () => {
      const menuListActionsRef = React.createRef();
      const listRef = React.createRef();
      render(<MenuList ref={listRef} actions={menuListActionsRef} />);
      const list = listRef.current;
      setStyleWidthForJsdomOrBrowser(list.style, '');
      stub(list, 'clientHeight').get(() => 11);

      expect(list.style).to.have.property('paddingRight', '');
      expect(list.style).to.have.property('paddingLeft', '');
      expect(list.style).to.have.property('width', '');

      menuListActionsRef.current.adjustStyleForScrollbar(
        { clientHeight: 10 },
        { direction: 'rtl' },
      );

      expect(list.style).to.have.property('paddingRight', '');
      expect(list.style).to.have.property('paddingLeft', expectedPadding);
      expect(list.style).to.have.property('width', `calc(100% + ${expectedPadding})`);
    });

    it('should not adjust styles when width already specified', () => {
      const menuListActionsRef = React.createRef();
      const listRef = React.createRef();
      render(<MenuList ref={listRef} actions={menuListActionsRef} />);
      const list = listRef.current;
      setStyleWidthForJsdomOrBrowser(list.style, '10px');
      Object.defineProperty(list, 'clientHeight', { value: 11 });

      expect(list.style).to.have.property('paddingRight', '');
      expect(list.style).to.have.property('paddingLeft', '');
      expect(list.style).to.have.property('width', '10px');

      menuListActionsRef.current.adjustStyleForScrollbar(
        { clientHeight: 10 },
        { direction: 'rtl' },
      );

      expect(list.style).to.have.property('paddingRight', '');
      expect(list.style).to.have.property('paddingLeft', '');
      expect(list.style).to.have.property('width', '10px');
    });
  });

  describe('keyboard navigation', () => {
    it('should move focus to the next item when pressing the right arrow key', async () => {
      const { user } = render(
        <MenuList>
          <MenuItem>one</MenuItem>
          <Divider />
          <MenuItem disabled>two</MenuItem>
          <MenuItem>three</MenuItem>
        </MenuList>,
      );

      const itemElements = screen.getAllByRole('menuitem');

      await user.tab();
      expect(itemElements[0]).toHaveFocus();
      expect(itemElements[0]).to.have.attribute('tabIndex', '0');
      expect(itemElements[1]).to.have.attribute('tabIndex', '-1');

      await user.keyboard('{ArrowDown}');
      expect(itemElements[2]).toHaveFocus();
      expect(itemElements[2]).to.have.attribute('tabIndex', '0');
      expect(itemElements[0]).to.have.attribute('tabIndex', '-1');

      await user.keyboard('{ArrowDown}');
      expect(itemElements[0]).toHaveFocus();
      expect(itemElements[0]).to.have.attribute('tabIndex', '0');
      expect(itemElements[1]).to.have.attribute('tabIndex', '-1');

      await user.keyboard('{ArrowUp}');
      expect(itemElements[2]).toHaveFocus();
      expect(itemElements[2]).to.have.attribute('tabIndex', '0');
      expect(itemElements[0]).to.have.attribute('tabIndex', '-1');

      await user.keyboard('{ArrowUp}');
      expect(itemElements[0]).toHaveFocus();
      expect(itemElements[0]).to.have.attribute('tabIndex', '0');
      expect(itemElements[1]).to.have.attribute('tabIndex', '-1');
    });

    it('should add tabindex="0" to the focused item', async () => {
      const { user } = render(
        <MenuList>
          <MenuItem>one</MenuItem>
          <Divider />
          <MenuItem>two</MenuItem>
        </MenuList>,
      );

      const tabElements = screen.getAllByRole('menuitem');

      fireEvent.focus(tabElements[1]);
      expect(tabElements[1]).to.have.attribute('tabIndex', '0');
      expect(tabElements[0]).to.have.attribute('tabIndex', '-1');

      await user.click(tabElements[0]);
      expect(tabElements[0]).to.have.attribute('tabIndex', '0');
      expect(tabElements[1]).to.have.attribute('tabIndex', '-1');
    });
  });
});
