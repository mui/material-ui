import * as React from 'react';
import { expect } from 'chai';
import { stub } from 'sinon';
import { createRenderer } from '@mui/internal-test-utils';
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
    skip: [
      'componentProp',
      'componentsProp',
      'themeDefaultProps',
      'themeStyleOverrides',
      'themeVariants',
    ],
  }));

  describe('prop: children', () => {
    it('should support null children', () => {
      const { getAllByRole } = render(
        <MenuList>
          <div role="menuitem">one</div>
          <div role="menuitem">two</div>
          {null}
        </MenuList>,
      );

      expect(getAllByRole('menuitem')).to.have.length(2);
    });

    it('should not add tabIndex to presentation elements like Divider when all Menu Items are disabled', () => {
      const { getByRole } = render(
        <MenuList>
          <MenuItem disabled>one</MenuItem>
          <Divider />
          <MenuItem disabled>two</MenuItem>
        </MenuList>,
      );

      expect(getByRole('separator')).not.to.have.attribute('tabIndex');
    });
  });

  describe('actions: adjustStyleForScrollbar', () => {
    const expectedPadding = `${getScrollbarSize(document)}px`;

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
});
