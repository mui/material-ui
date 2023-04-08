import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from 'test/utils';
import useMenu from '@mui/base/useMenu';
import { MenuUnstyledContext } from '@mui/base/MenuUnstyled';
import MenuItemUnstyled, { MenuItemMetadata } from '@mui/base/MenuItemUnstyled';

describe('useMenu', () => {
  const { render } = createRenderer();
  describe('prop: id', () => {
    it('propagates it to the root element', () => {
      let menuItemsData: Record<string, MenuItemMetadata> | undefined;
      function Menu({ options }: { options: Array<string> }) {
        const ref = React.createRef();
        const { getListboxProps, contextValue, menuItems } = useMenu({ listboxRef: ref });
        menuItemsData = menuItems;
        return (
          <ul {...getListboxProps()}>
            {
              <MenuUnstyledContext.Provider value={contextValue}>
                {options.map((option) => (
                  <MenuItemUnstyled value={option} label={option} key={option} />
                ))}
              </MenuUnstyledContext.Provider>
            }
          </ul>
        );
      }
      const extractLables = () => Object.values(menuItemsData!).map((data) => data.label);

      const mount = render(<Menu options={['1', '2', '3', '4', '5']} />);

      mount.setProps({ options: ['1', '5'] });
      expect(extractLables()).deep.equal(['1', '5']);

      mount.setProps({ options: ['1', '2', '3', '4', '5'] });
      expect(extractLables()).deep.equal(['1', '2', '3', '4', '5']);
    });
  });
});
