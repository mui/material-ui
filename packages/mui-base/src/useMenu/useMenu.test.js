import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, screen, fireEvent } from '@mui/internal-test-utils';
import { MenuItem } from '../MenuItem';
import { useMenu } from './useMenu';

describe('useMenu', () => {
  const { render } = createRenderer();

  describe('getListboxProps', () => {
    it('returns props for root slot', () => {
      function TestMenu() {
        const listboxRef = React.createRef();
        const { getListboxProps } = useMenu({ listboxRef });
        return <div {...getListboxProps()} />;
      }

      function Test() {
        return (
          <TestMenu>
            <MenuItem />
          </TestMenu>
        );
      }

      const { getByRole } = render(<Test />);

      const menu = getByRole('menu');
      expect(menu).not.to.equal(null);
    });

    it('forwards external props including event handlers', () => {
      const handleClick = spy();

      function TestMenu() {
        const listboxRef = React.createRef();
        const { getListboxProps } = useMenu({ listboxRef });
        return (
          <div {...getListboxProps({ 'data-testid': 'test-listbox', onClick: handleClick })} />
        );
      }

      function Test() {
        return (
          <TestMenu>
            <MenuItem />
          </TestMenu>
        );
      }

      render(<Test />);

      const listbox = screen.getByTestId('test-listbox');
      expect(listbox).not.to.equal(null);

      fireEvent.click(listbox);
      expect(handleClick.callCount).to.equal(1);
    });
  });
});
