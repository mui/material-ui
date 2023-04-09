import * as React from 'react';
import { expect } from 'chai';
import { act, createRenderer, fireEvent } from 'test/utils';
import useMenu from '@mui/base/useMenu';
import { MenuUnstyledContext } from '@mui/base/MenuUnstyled';
import MenuItemUnstyled from '@mui/base/MenuItemUnstyled';

describe('useMenu', () => {
  const { render } = createRenderer();
  it('should register options in correct order', () => {
    function Menu() {
      const ref = React.createRef();
      const { getListboxProps, contextValue } = useMenu({ listboxRef: ref });
      const [options, setOptions] = React.useState(['1', '2', '3', '4', '5']);
      return (
        <React.Fragment>
          <button onClick={() => setOptions(['6', '7', '3', '8', '9'])}>update options</button>
          <ul {...getListboxProps()}>
            {
              <MenuUnstyledContext.Provider value={contextValue}>
                {options.map((option) => (
                  <MenuItemUnstyled value={option} label={option} key={option} />
                ))}
              </MenuUnstyledContext.Provider>
            }
          </ul>
        </React.Fragment>
      );
    }

    const mount = render(<Menu />);

    const { getByRole } = mount;

    const menu = getByRole('menu');
    const button = getByRole('button');
    const options = menu.querySelectorAll('li')!;

    act(() => {
      menu.focus();
    });

    const checkFocusedOption = (option: HTMLLIElement) => {
      expect(document.activeElement).to.equal(option);
    };

    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    checkFocusedOption(options[1]);
    fireEvent.keyDown(options[1], { key: 'ArrowDown' });
    checkFocusedOption(options[2]);
    fireEvent.keyDown(options[2], { key: 'ArrowDown' });
    checkFocusedOption(options[3]);
    fireEvent.keyDown(options[3], { key: 'ArrowDown' });
    checkFocusedOption(options[4]);

    fireEvent.click(button);

    act(() => {
      menu.focus();
    });
    const updatedOptions = menu.querySelectorAll('li');

    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    checkFocusedOption(updatedOptions[1]);
    fireEvent.keyDown(updatedOptions[1], { key: 'ArrowDown' });
    checkFocusedOption(updatedOptions[2]);
    fireEvent.keyDown(updatedOptions[2], { key: 'ArrowDown' });
    checkFocusedOption(updatedOptions[3]);
    fireEvent.keyDown(updatedOptions[3], { key: 'ArrowDown' });
    checkFocusedOption(updatedOptions[4]);
  });
});
